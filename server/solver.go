package nerd

import (
	"context"
	"errors"
	"strings"

	"github.com/rs/zerolog/log"

	"github.com/bufbuild/connect-go"
	nerdv1 "github.com/jacobmichels/computer_nerd/gen/proto/v1"
)

type SolverService struct{}

func (s *SolverService) Solve(ctx context.Context, req *connect.Request[nerdv1.SolveRequest]) (*connect.Response[nerdv1.SolveResponse], error) {
	log.Info().Msg("Solve request received")

	if len(req.Msg.Grid) != int(req.Msg.Rows)*int(req.Msg.Cols) {
		log.Warn().Msg("unexpected length of input grid")

		return nil, errors.New("bad array length")
	}

	grid2d := reshape(req.Msg.Grid, req.Msg.Rows, req.Msg.Cols)

	solution := solve(grid2d, req.Msg.DesiredString, req.Msg.BufferSize, req.Msg.Rows, req.Msg.Cols)
	if solution == nil {
		log.Info().Msg("No solution found for this request")

		return &connect.Response[nerdv1.SolveResponse]{
			Msg: &nerdv1.SolveResponse{
				Possible:        false,
				SolutionIndexes: nil,
			},
		}, nil
	}

	rpcSolution := []*nerdv1.Index{}
	for _, index := range solution.index_sequence {
		rpcSolution = append(rpcSolution, &nerdv1.Index{X: int32(index.X), Y: int32(index.Y)})
	}

	log.Info().Msg("Returning solution")

	return &connect.Response[nerdv1.SolveResponse]{
		Msg: &nerdv1.SolveResponse{
			Possible:        true,
			SolutionIndexes: rpcSolution,
		},
	}, nil
}

// Make a 2d array from a 1d one
// Needed since we can't trivially transmit a 2d array using protocol buffers
func reshape(array []string, rows, cols int32) [][]string {
	grid := make([][]string, rows)
	grid[0] = make([]string, 0, cols)

	currRow := 0

	for i, val := range array {
		if i != 0 && i%int(cols) == 0 {
			currRow++
		}

		grid[currRow] = append(grid[currRow], val)
	}

	return grid
}

func solve(grid [][]string, desiredString []string, bufferSize, rows, cols int32) *path {
	visited := make([][]bool, rows)

	for row := range grid {
		visited[row] = make([]bool, 0, cols)
		for range grid[0] {
			visited[row] = append(visited[row], false)
		}
	}

	paths := []path{}

	// List paths recursively starting at each node on the top-most row
	for i := 0; i < int(cols); i++ {
		visited[0][i] = true
		paths = append(paths, listPathsRecursive(path{index_sequence: []index{{X: i, Y: 0}}}, visited, 0, int32(i), rows, cols, bufferSize, true)...)
		visited[0][i] = false
	}

	filteredPaths := []path{}
	badPathCount := 0

	for _, path := range paths {
		if (path.index_sequence[0] == path.index_sequence[1]) || (path.index_sequence[0] == path.index_sequence[2] || (path.index_sequence[0] == path.index_sequence[3])) || (path.index_sequence[1] == path.index_sequence[2]) || (path.index_sequence[1] == path.index_sequence[3]) || (path.index_sequence[2] == path.index_sequence[3]) {
			badPathCount++
		} else {
			filteredPaths = append(filteredPaths, path)
		}
	}

	if badPathCount != 0 {
		log.Warn().Int("count", badPathCount).Msg("Non-zero count of bad paths")
	}

	for _, path := range filteredPaths {
		str := renderPath(grid, path)
		if renderedPathContains(desiredString, str) {
			return &path
		}
	}

	return nil
}

type path struct {
	index_sequence []index
}

type index struct {
	X int
	Y int
}

// A recursive algorithm to exhaustively list all of the possible breach protocol paths that fit within the buffer size
func listPathsRecursive(p path, visted [][]bool, cur_row, cur_col, rows, cols, bufferSize int32, vertical bool) []path {
	paths := []path{}

	// if we've filled the buffer, return
	// this is our base case
	if len(p.index_sequence) == int(bufferSize) {
		return []path{p}
	}

	// this if-else block handles the alternation between vertical and horizontal node selection
	if vertical {
		// Loop through the nodes in the same column, visiting each unvisited one and ignoring the one previously selected
		for i := 0; i < int(rows); i++ {
			if !visted[i][cur_col] && int(cur_row) != i {
				// Mark this node as visited, then recursively list paths from this node remembering the sequence of nodes we've already visited
				visted[i][cur_col] = true
				cur_path := path{index_sequence: make([]index, len(p.index_sequence))}
				copy(cur_path.index_sequence, p.index_sequence)
				cur_path.index_sequence = append(cur_path.index_sequence, index{X: int(cur_col), Y: i})
				paths = append(paths, listPathsRecursive(cur_path, visted, int32(i), cur_col, rows, cols, bufferSize, !vertical)...)

				// Mark this node as unvisited so it can be used in future paths
				visted[i][cur_col] = false
			}
		}
	} else {
		// Loop through the nodes in the same row, visiting each unvisited one and ignoring the one previously selected
		for i := 0; i < int(cols); i++ {
			if !visted[cur_row][i] && int(cur_col) != i {
				// Mark this node as visited, then recursively list paths from this node remembering the sequence of nodes we've already visited
				visted[cur_row][i] = true
				cur_path := path{index_sequence: make([]index, len(p.index_sequence))}
				copy(cur_path.index_sequence, p.index_sequence)
				cur_path.index_sequence = append(cur_path.index_sequence, index{X: i, Y: int(cur_row)})
				paths = append(paths, listPathsRecursive(cur_path, visted, cur_row, int32(i), rows, cols, bufferSize, !vertical)...)

				// Mark this node as unvisited so it can be used in future paths
				visted[cur_row][i] = false
			}
		}
	}

	return paths
}

// Translates the indices in a path to their string values in the grid
// ex. (1,2), (2,2), (2,1) -> E9, BD, 5C
func renderPath(grid [][]string, p path) []string {
	str := []string{}
	for _, index := range p.index_sequence {
		str = append(str, grid[index.Y][index.X])
	}

	return str
}

// Check if a rendered path contains the desired values
func renderedPathContains(desired, actual []string) bool {
	if len(desired) > len(actual) {
		return false
	}

	joinedDesired := strings.Join(desired, " ")
	joinedActual := strings.Join(actual, " ")

	return strings.Contains(joinedActual, joinedDesired)
}

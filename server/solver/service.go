package solver

import (
	"context"
	"errors"
	"fmt"

	"github.com/bufbuild/connect-go"
	nerdv1 "github.com/jacobmichels/computer_nerd/gen/proto/v1"
)

type Service struct{}

func (s *Service) Solve(ctx context.Context, req *connect.Request[nerdv1.SolveRequest]) (*connect.Response[nerdv1.SolveResponse], error) {
	if len(req.Msg.Grid) != int(req.Msg.Rows)*int(req.Msg.Cols) {
		return nil, errors.New("bad array length")
	}

	grid2d := reshape(req.Msg.Grid, req.Msg.Rows, req.Msg.Cols)

	fmt.Println(grid2d)

	solution := solve(grid2d)

	if solution == "" {
		return &connect.Response[nerdv1.SolveResponse]{
			Msg: &nerdv1.SolveResponse{
				Possible: false,
				Indexes:  nil,
			},
		}, nil
	}

	return &connect.Response[nerdv1.SolveResponse]{
		Msg: &nerdv1.SolveResponse{
			Possible: true,
			Indexes:  nil,
		},
	}, nil
}

// make a 2d array from a 1d one
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

func solve(grid [][]string) (path string) {
	return ""
}

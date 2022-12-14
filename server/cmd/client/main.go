package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/bufbuild/connect-go"
	nerdv1 "github.com/jacobmichels/computer_nerd/gen/proto/v1"
	"github.com/jacobmichels/computer_nerd/gen/proto/v1/nerdv1connect"
)

func main() {
	c := nerdv1connect.NewSolveServiceClient(http.DefaultClient, "http://localhost:8080")

	res, err := c.Solve(context.Background(), &connect.Request[nerdv1.SolveRequest]{
		Msg: &nerdv1.SolveRequest{
			Rows: 3,
			Cols: 4,
			Grid: []string{
				"1", "2", "3", "4",
				"5", "6", "7", "8",
				"9", "10", "11", "12"},
			BufferSize:    6,
			DesiredString: []string{"8", "12", "11", "3"},
		},
	})
	if err != nil {
		panic(err)
	}

	for _, index := range res.Msg.SolutionIndexes {
		fmt.Printf("X:%d Y:%d\n", index.X, index.Y)
	}
}

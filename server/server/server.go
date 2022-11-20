package server

import (
	"log"
	"net/http"

	"github.com/jacobmichels/computer_nerd/gen/proto/v1/nerdv1connect"
	"github.com/jacobmichels/computer_nerd/solver"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func Start(solverService *solver.Service) {
	mux := http.NewServeMux()
	path, handler := nerdv1connect.NewSolveServiceHandler(solverService)
	mux.Handle(path, handler)

	if err := http.ListenAndServe(":8080", h2c.NewHandler(mux, &http2.Server{})); err != nil {
		log.Printf("bad thing happened: %v", err)
	}
}

package nerd

import (
	"net/http"
	"os"

	"github.com/jacobmichels/computer_nerd/gen/proto/v1/nerdv1connect"
	"github.com/rs/cors"
	"github.com/rs/zerolog/log"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func StartServer(s *SolverService) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	path, handler := nerdv1connect.NewSolveServiceHandler(s)
	mux.Handle(path, handler)

	corsMux := cors.Default().Handler(mux)

	log.Info().Str("port", port).Msg("Starting server")

	if err := http.ListenAndServe(":"+port, h2c.NewHandler(corsMux, &http2.Server{})); err != nil {
		log.Err(err).Msg("http server error")
	}
}

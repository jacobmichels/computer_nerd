package main

import (
	"os"

	nerd "github.com/jacobmichels/computer_nerd"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	if stdoutIsTerminal() {
		usePrettyLogging()
	}

	s := &nerd.SolverService{}
	nerd.StartServer(s)
}

func stdoutIsTerminal() bool {
	o, _ := os.Stdout.Stat()
	return o.Mode()&os.ModeCharDevice == os.ModeCharDevice
}

func usePrettyLogging() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
}

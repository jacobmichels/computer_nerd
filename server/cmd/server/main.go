package main

import (
	"github.com/jacobmichels/computer_nerd/server"
	"github.com/jacobmichels/computer_nerd/solver"
)

func main() {
	s := &solver.Service{}
	server.Start(s)
}

# Computer_nerd

Computer_nerd is a Cyberpunk breach protocol solver. [Check it out!](https://jacobmichels.github.io/computer_nerd/)

## Repo structure

This repo contains the React frontend and Go backend, and the protocol buffer service definition.

## Backend

The backend is a go application that hosts a [connect-go](https://github.com/bufbuild/connect-go) server.

The only endpoint is Solve, which takes in a grid, a buffer size, and the desired path and outputs if the desired pattern is possible to find in the grid, and if so, the path itself. We get the desired path by generating all paths through the grid abiding by breach protocol rules, then checking if the desired path is in the list of all paths. There is probably a better way of doing this, but this works well enough.

The server is stateless, so it can be easily run in something like kubernetes or cloud run.

## Frontend

The frontend is a react app made with with [chakra](https://chakra-ui.com/) components.

The frontend gets a grid, buffer size, and desired path from the user and sends it to the backend. If the puzzle was solved by the backend, it will display the solution path through the grid in green.

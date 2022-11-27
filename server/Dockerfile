FROM golang:1.19.3-alpine3.16 AS builder

WORKDIR /app

COPY go.mod .
COPY go.mod .

RUN go mod download

COPY . .

RUN go build -o /usr/bin/server cmd/server/main.go

FROM alpine:3.16.3

COPY --from=builder /usr/bin/server /usr/bin/server

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENTRYPOINT [ "/usr/bin/server" ]
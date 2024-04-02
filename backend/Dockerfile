FROM golang:1.22.1-alpine

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 8080

CMD ["go", "run", "."]
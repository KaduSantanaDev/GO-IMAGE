FROM golang:1.23.8-alpine AS builder

WORKDIR /app

COPY . .


RUN apk add --no-cache upx \
 && go build -ldflags="-s -w" -o app \
 && upx --best --ultra-brute app

FROM scratch
COPY --from=builder /app/app /app/app

ENTRYPOINT ["/app/app"]
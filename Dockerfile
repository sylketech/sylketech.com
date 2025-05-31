FROM node:22-alpine AS frontend

WORKDIR /app
COPY client/package.json client/pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
COPY client ./
RUN pnpm run generate:sitemap
RUN pnpm run build

FROM rust:1.87-alpine AS builder

RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache lld mold musl musl-dev libc-dev cmake clang clang-dev openssl file \
        libressl-dev git make build-base bash curl wget zip gnupg coreutils gcc g++  zstd binutils ca-certificates upx
WORKDIR /app
COPY server ./
RUN rustup target add x86_64-unknown-linux-musl
RUN cargo build --release --target x86_64-unknown-linux-musl

FROM alpine:3.22.0 AS files

RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache ca-certificates mailcap tzdata
RUN update-ca-certificates
ENV USER=sylketech
ENV UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

FROM scratch AS runner

COPY --from=files --chmod=444 \
    /etc/passwd \
    /etc/group \
    /etc/nsswitch.conf \
    /etc/mime.types \
    /etc/
COPY --from=files --chmod=444 /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=files --chmod=444 /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/server /bin/sylketech-server
USER sylketech:sylketech
WORKDIR /app
COPY --from=frontend /app/dist ./dist
ENTRYPOINT ["/bin/sylketech-server"]
EXPOSE 3000

FROM node:24.12.0-slim AS builder

WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy source code
COPY packages/ packages/
COPY practices/ practices/
COPY apps/vbi_fe/ apps/vbi_fe/

# Install dependencies and build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=vbi_fe build

# Serve stage
FROM nginx:alpine

# Note: The context root is the project root, but this Dockerfile is in docker/vbi_fe/
# so we copy nginx.conf from the docker directory
COPY docker/vbi_fe/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/vbi_fe/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

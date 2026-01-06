FROM node:24.12.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy source code (backend and packages it depends on)
COPY packages/ packages/
COPY apps/vbi_be/ apps/vbi_be/

# Install dependencies and build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter vbi_be build

EXPOSE 3030

CMD [ "node", "apps/vbi_be/dist/main" ]

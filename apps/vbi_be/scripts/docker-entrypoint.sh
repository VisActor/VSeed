#!/bin/sh

# Ensure we are in the project directory for Prisma commands
PROJECT_DIR="apps/vbi_be"

echo "📦 Generating Prisma Client..."
(cd $PROJECT_DIR && pnpx prisma generate)

echo "🛠  Running migrations..."
(cd $PROJECT_DIR && pnpx prisma migrate dev --name init --skip-seed)

echo "🌱 Seeding database..."
(cd $PROJECT_DIR && pnpx prisma db seed)

echo "🟢 Starting the application..."
exec "$@"
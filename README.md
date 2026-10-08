# Airport

Пустой full stack проект: React (Vite) + Tailwind CSS, Node.js + Express, PostgreSQL + Prisma.

## Структура

```
backend/   Express API + Prisma (prisma/schema.prisma)
frontend/  React (Vite) + Tailwind CSS
docker-compose.yml  PostgreSQL + backend + frontend
```

## Запуск через Docker

```
docker compose up -d --build
```

- Сайт: http://localhost:8081
- API: http://localhost:3000/api/health
- PostgreSQL: localhost:5433 (postgres / postgres, база `airport`)

При старте backend автоматически применяет миграции (`prisma migrate deploy`).

## Локальная разработка (без Docker для backend/frontend)

```
docker compose up -d db
cd backend
copy .env.example .env
npm install
npm run dev
```

```
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173 (запросы `/api` проксируются на :3000).

## Prisma

Модели добавляются в `backend/prisma/schema.prisma`, затем:

```
cd backend
npx prisma migrate dev --name <название>
```

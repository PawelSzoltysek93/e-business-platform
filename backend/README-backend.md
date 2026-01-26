# Backend – E-Business Platform

This repository contains the backend service for the **E-Business Platform**.  
It is a REST API built with **Node.js, TypeScript, Express, and MongoDB**, fully containerized using **Docker** and **Docker Compose**.

The project supports **separate development and production environments**.

---

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Vitest + Supertest (integration tests)
- Docker (multi-stage build)
- Docker Compose

---

## Project Structure

```
backend/
├── src/                     # Application source code
├── dist/                    # Compiled production build
├── Dockerfile               # Multi-stage Dockerfile
├── docker-compose.yml       # Production-like setup
├── docker-compose.dev.yml   # Development setup
└── README.md
```

---

## Prerequisites

- Docker Desktop
- Docker Compose
- Node.js (only required if running without Docker)

---

## Development Mode (Hot Reload)

Use this mode when actively developing the backend.

### Start development environment

```bash
docker compose -f docker-compose.dev.yml up
```

What happens:
- MongoDB runs in a container
- Backend runs in development mode
- Source code is mounted via volumes
- Hot reload is enabled (`ts-node-dev`)

Backend will be available at:

```
http://localhost:3000
```

### Stop development environment

```bash
docker compose -f docker-compose.dev.yml down
```

---

## Production-like Mode (Multi-Stage Docker)

Use this mode to simulate production behavior.

### Build and start containers

```bash
docker compose up --build
```

What happens:
- Backend is built using a multi-stage Dockerfile
- TypeScript is compiled to JavaScript
- Only compiled code (`dist`) is used
- No volumes, no hot reload

Backend will be available at:

```
http://localhost:3000
```

### Stop containers

```bash
docker compose down
```

---

## Running Tests

Integration tests are written using **Vitest** and **Supertest**.

### Run tests

```bash
npx vitest
```

Tests cover:
- GET /api/products
- POST /api/products
- PATCH /api/products/:id
- DELETE /api/products/:id

---

## Environment Variables

The backend uses the following environment variable:

```env
MONGO_URI=mongodb://mongo:27017/ebusiness
```

This variable is provided automatically by Docker Compose.

---

## API Overview

Base path:

```
/api/products
```

Available endpoints:

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/products | Get all products |
| POST | /api/products | Create a product |
| PATCH | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |

---

## Notes

- Development and production environments are intentionally separated.
- All code changes are made on the host machine and committed to Git.
- Docker containers are used only to run the application, not to edit code.

---

## Author

Backend developed as part of the E-Business Platform project.

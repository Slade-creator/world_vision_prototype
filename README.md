# Field Finance Tracker (FFT)

A full-stack mobile application for tracking field-level financial transactions, budgets, and programmatic targets — built for **World Vision Zambia**.

## Overview

FFT empowers field teams to manage finances from a mobile device:

- **Development Facilitators (DF)** submit expenses and monitor budgets
- **Finance Officers** review, approve, reject, or request corrections on expenses
- **DME Officers** track programmatic targets and review activity entries
- **Supervisors** monitor budget utilisation across the portfolio

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.12+, FastAPI, SQLModel ORM, SQLite |
| Frontend | React Native (Expo), TypeScript, Expo Router |
| Auth | JWT with bcrypt password hashing |
| Design | Custom humanitarian-themed design system |

## Project Structure

```
├── backend/            # FastAPI REST API
│   ├── main.py         # App entry point
│   ├── Model/          # SQLModel entities and enums
│   ├── Controller/     # Route handlers
│   ├── Service/        # Business logic layer
│   ├── Respositories/  # Data access layer
│   ├── Middleware/     # JWT auth and RBAC guards
│   └── Config/         # Database, settings, seed data
│
├── frontend/           # React Native (Expo) mobile app
│   ├── app/            # Expo Router screens (role-based)
│   ├── components/     # Shared UI components
│   ├── context/        # Auth state management
│   ├── theme/          # Design system tokens
│   ├── shared/         # Common types, hooks, utils
│   └── Service/        # API client
│
└── uv.lock             # Python dependency lock file
```

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The API runs at `http://localhost:8000`. Interactive docs at `/docs` (Swagger) or `/redoc` (ReDoc). Demo data is seeded automatically on first run.

### Frontend

```bash
cd frontend
npm install
npm start
```

Scan the Expo QR code with your device, or press `a` (Android), `i` (iOS), or `w` (web).

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| DF | `df@worldvision.org` | `password123` |
| Finance | `finance@worldvision.org` | `password123` |
| DME | `dme@worldvision.org` | `password123` |
| Admin | `admin@worldvision.org` | `password123` |

## Role-Based Access

Five roles with granular permissions: **DF**, **Finance**, **DME**, **Supervisor**, and **Super User**. Each role has tailored screens and access controls enforced via JWT middleware.

## Architecture

Clean layered architecture with dependency injection:

```
Controller (routes) → Service (business logic) → Repository (data access) → SQLite
```

Admin expenses route to Finance-only review; Activity expenses route to Finance then DME review (sequential). The client generates a `local_id` for offline deduplication on the server.

## License

Interview / demonstration use only — built as a portfolio project to showcase during interviews.

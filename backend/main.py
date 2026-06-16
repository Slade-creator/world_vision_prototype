import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from Config.settings import CORS_ORIGINS
from Config.database import create_db_and_tables
from Controller.controller import (
    auth_router,
    transaction_router,
    review_router,
    budget_router,
    rate_router,
)




# ─── Startup Events ───────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting Database")
    db_engine = create_db_and_tables()
    yield

    if db_engine is not None:
        print("Ending Database")
        db_engine.dispose()

# ─── App Initialization ───────────────────────────────────────────────────────

app = FastAPI(
    title="Field Finance Tracker API",
    description="Backend API for the FFT mobile application — World Vision Zambia Internship Phase",
    version="1.0.0",
    docs_url="/docs",       # Swagger UI at /docs
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ─── CORS Middleware ──────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────

app.include_router(auth_router)
app.include_router(transaction_router)
app.include_router(review_router)
app.include_router(budget_router)
app.include_router(rate_router)


# ─── Health Check ─────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
def root():
    return {
        "system": "Field Finance Tracker",
        "organization": "World Vision Zambia",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health", tags=["Health"])
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
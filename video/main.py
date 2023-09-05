import logging

from fastapi import FastAPI
from api.api import router as api_router

logger = logging.getLogger("uvicorn")

app = FastAPI()
app.include_router(api_router)








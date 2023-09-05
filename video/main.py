from fastapi import FastAPI
from api.api import router as api_router

import logging

# Intialisation du looger
logger = logging.getLogger("uvicorn")

# Initialisation de l'API
app = FastAPI()
app.include_router(api_router)








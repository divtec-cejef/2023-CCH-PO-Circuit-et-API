from fastapi import APIRouter
from api.routes.obs_routes import router as obs_router

router = APIRouter()
router.include_router(obs_router)

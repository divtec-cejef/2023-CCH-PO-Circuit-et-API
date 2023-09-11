from api_voiture import api_patch_race_url as race_patch
from fastapi import APIRouter
from ftp import ftp_connector as ftp
from dotenv import load_dotenv

import glob
import os
import time
import obs.obs_connection as obs
import logging

# initialisation du .env
load_dotenv()

# Intialisation du looger
logger = logging.getLogger("uvicorn")

# Initialisation du router
router = APIRouter(
    prefix="/obs",
    tags=["OBS"],
    responses={404: {"description": "Not found"}}
)

# Initialisation des variables globales
new_record = False


@router.get("/start")
async def start():
    """
    Démarre l'enregistrement de la vidéo
    :return: 200 si début de l'enregistrement, 400 si l'enregistrement est déjà en cours
    """
    try:
        obs.start_record()
        logger.info("Record started")
        return {200: {"description": "Record started"}}
    except Exception as e:
        logger.error("Record already started | " + str(e))
        return {400: {"description": "Record already started"}}


@router.get("/sector/{sector_num}")
async def sector(sector_num: int):
    """
    Change le secteur de la vidéo
    :param sector_num: Numéro du secteur
    :return: 200 si le secteur a été changé, 400 si le secteur n'est pas valide
    """
    try:
        obs.change_sector(sector_num)
        logger.info("Changed sector to " + str(sector_num))
        return {200: {"description": sector_num}}
    except Exception as e:
        logger.error("Sector num invalid | " + str(e))
        return {400: {"description": str(sector_num) + " is not a valid sector"}}


@router.get("/finish")
async def finish():
    """
    Arrête l'enregistrement de la vidéo
    :return: 200 si l'enregistrement a été arrêté, 400 si l'enregistrement n'a pas été démarré
    """
    try:
        obs.stop_record()
        global new_record
        new_record = True
        logger.info("Record stopped")
        return {200: {"description": "Record stopped. Don't forget to upload the video"}}
    except Exception as e:
        logger.error("Record not started | " + str(e))
        return {400: {"description": "Record not started"}}


@router.get("/upload/{id_race}")
async def upload(id_race: int):
    """
    Upload la vidéo sur Dropbox
    :param id_race: Id de la course
    :return: 200 si la vidéo a été upload, 400 si la vidéo n'a pas été upload
    """
    global new_record
    if not new_record:
        return {400: {"description": "No new record to upload"}}

    # Récupération des fichiers dans le dossier
    path = "C:\\Users\\Admin\\Videos\\"
    files = list(filter(os.path.isfile, glob.glob(path + "*")))
    files.sort(key=lambda x: os.path.getmtime(x))
    time.sleep(1)

    # Renommage du fichier
    file_name = f"{id_race}.mp4"
    file_path = path + file_name
    os.rename(files[-1], file_path)
    logger.info("File renamed to " + file_name)

    # Upload du fichier
    try:
        logger.info("Uploading file... ")
        ftp.upload_file(file_path, file_name)
        link = os.environ['VIDEO_URL'] + file_name
        logger.info("File uploaded")
        # link = dropbox.upload_file(file_path, file_name)
    except Exception as e:
        logger.error("Error while uploading file | " + str(e))
        if os.path.isfile(file_path):
            os.remove(file_path)
            logger.info("File removed")
        return {400: {"description": "Error while uploading file"}}

    time.sleep(.5)
    os.remove(file_path)
    logger.info("File removed")

    new_record = False

    # Ajout du lien dans la base de données
    try:
        await race_patch.patch_race_url(id_race, link)
        logger.info("Link added to database")
        return {200: {"description": "File uploaded"}}
    except Exception as e:
        logger.error("Error while adding link to database | " + str(e))
        return {400: {"description": "Error while adding link to database"}}



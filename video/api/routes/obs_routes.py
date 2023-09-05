from api_voiture import api_patch_race_url as race_patch
from fastapi import APIRouter

import glob
import os
import time
import obs.obs_connection as obs
import dropbox_utils.dropbox_utils as dropbox

# Initialisation du router
router = APIRouter(
    prefix="/obs",
    tags=["OBS"],
    responses={404: {"description": "Not found"}}
)

# Initialisation des variables globales
record_started = False


@router.get("/start")
async def start():
    """
    Démarre l'enregistrement de la vidéo
    :return: 200 si début de l'enregistrement, 400 si l'enregistrement est déjà en cours
    """
    global record_started
    if record_started:
        return {400: {"description": "Record already started"}}
    obs.start_record()
    record_started = True
    return {200: {"description": "Record started"}}


@router.get("/sector/{sector_num}")
async def sector(sector_num: int):
    """
    Change le secteur de la vidéo
    :param sector_num: Numéro du secteur
    :return: 200 si le secteur a été changé, 400 si le secteur n'est pas valide
    """
    try:
        obs.change_sector(sector_num)
        return {200: {"description": sector_num}}
    except Exception as e:
        print(e)
        return {400: {"description": str(sector_num) + " is not a valid sector"}}


@router.get("/finish")
async def finish():
    """
    Arrête l'enregistrement de la vidéo
    :return: 200 si l'enregistrement a été arrêté, 400 si l'enregistrement n'a pas été démarré
    """
    global record_started

    if not record_started:
        return {400: {"description": "Record not started"}}

    obs.stop_record()

    return {200: {"description": "Record stopped. Don't forget to upload the video"}}


@router.get("/upload/{id_race}")
async def upload(id_race: int):
    """
    Upload la vidéo sur Dropbox
    :param id_race: Id de la course
    :return: 200 si la vidéo a été upload, 400 si la vidéo n'a pas été upload
    """

    # Récupération des fichiers dans le dossier
    path = "C:\\Users\\Admin\\Videos\\"
    files = list(filter(os.path.isfile, glob.glob(path + "*")))
    files.sort(key=lambda x: os.path.getmtime(x))
    print(files)
    time.sleep(1)

    # Renommage du fichier
    file_name = f"{id_race}.mp4"
    file_path = path + file_name
    os.rename(files[-1], file_path)

    # Upload du fichier
    try:
        link = dropbox.upload_file(file_path, file_name)
    except Exception as e:
        print(e)
        return {400: {"description": "Error while uploading file"}}

    time.sleep(.5)
    os.remove(file_path)

    global record_started
    record_started = False

    # Ajout du lien dans la base de données
    try:
        race_patch.patch_race_url(id_race, link)
        return {200: {"description": "File uploaded"}}
    except Exception as e:
        print(e)
        return {400: {"description": "Error while adding link to database"}}



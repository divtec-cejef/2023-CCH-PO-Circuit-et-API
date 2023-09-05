import glob
import os
import time
from datetime import datetime
from api_voiture import api_patch_race_url as race_patch

from fastapi import APIRouter
import obs.obs_connection as obs
import dropbox_utils.dropbox_utils as dropbox

router = APIRouter(
    prefix="/obs",
    tags=["OBS"],
    responses={404: {"description": "Not found"}}
)

record_started = False


@router.get("/start")
async def start():
    global record_started
    if record_started:
        return {400: {"description": "Record already started"}}
    obs.start_record()
    record_started = True
    return {200: {"description": "Record started"}}


@router.get("/sector/{sector_num}")
async def sector(sector_num: int):
    try:
        obs.change_sector(sector_num)
        return {200: {"description": sector_num}}
    except Exception as e:
        print(e)
        return {400: {"description": str(sector_num) + " is not a valid sector"}}


@router.get("/finish")
async def finish():
    global record_started

    if not record_started:
        return {400: {"description": "Record not started"}}

    obs.stop_record()

    return {200: {"description": "Record stopped. Don't forget to upload the video"}}


@router.get("/upload/{id_race}")
async def upload(id_race: int):
    path = "C:\\Users\\Admin\\Videos\\"
    files = list(filter(os.path.isfile, glob.glob(path + "*")))
    files.sort(key=lambda x: os.path.getmtime(x))
    print(files)
    time.sleep(1)

    file_name = f"{id_race}.mp4"
    file_path = path + file_name
    os.rename(files[-1], file_path)

    try:
        link = dropbox.upload_file(file_path, file_name)
    except Exception as e:
        print(e)
        return {400: {"description": "Error while uploading file"}}

    time.sleep(.5)
    os.remove(file_path)

    global record_started
    record_started = False

    try:
        race_patch.patch_race_url(id_race, link)
        return {200: {"description": "File uploaded"}}
    except Exception as e:
        print(e)
        return {400: {"description": "Error while adding link to database"}}



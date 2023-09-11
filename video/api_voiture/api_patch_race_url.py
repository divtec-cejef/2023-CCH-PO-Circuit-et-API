from api_voiture import api_token
from dotenv import load_dotenv

import os
import requests
import logging

# Intialisation du looger
logger = logging.getLogger("uvicorn")


async def patch_race_url(*args):
    """
    Patch l'url de la vidéo de la course
    :param args: Id de la course, Url de la vidéo
    :return: none
    """
    response = await patch_api_url_race(*args)
    if response.status_code == 401:
        response = await patch_api_url_race(*args)

    if response.status_code != 200:
        logger.error("Couldn't insert url | " + response.status_code + " : " + response.json())
        raise Exception("Cannot insert url")


async def patch_api_url_race(id_race: int, video_url: str):
    """
    Patch l'url de la vidéo de la course
    :param id_race: Id de la course
    :param video_url: Url de la vidéo
    :return: none
    """
    load_dotenv()
    return requests.patch(os.environ['API_URL'] + "race/",
                          headers={"Authorization": "Bearer " + str(await api_token.get_token())},
                          json={"id_race": id_race, "video_url": video_url})

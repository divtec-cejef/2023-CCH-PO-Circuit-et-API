from dotenv import load_dotenv

import requests
import os
import logging

# Intialisation du looger
logger = logging.getLogger("uvicorn")

# Initialisation des variables globales
token = ""


async def get_token():
    """
    Récupère le token de l'API
    :return: le token
    """
    global token
    if token == "":
        try:
            token = await get_token_from_race()
        except Exception as e:
            logger.error("Error while getting token | " + str(e))
    return token


async def get_new_token():
    """
    Récupère un nouveau token de l'API
    :return: le token
    """
    global token
    token = ""
    return get_token()


async def get_token_from_race():
    """
    Intialise le token de l'API
    :return: le token
    """
    load_dotenv()
    response = requests.post(os.environ['API_URL'] + "authentication/section/",
                             json={"section": os.environ['SECTION_NAME'],
                                   "password": os.environ['SECTION_PASSWORD']})

    if response.status_code == 200:
        return response.json()['token']
    else:
        raise Exception("Error while getting token")

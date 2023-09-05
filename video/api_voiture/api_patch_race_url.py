from api_voiture import api_token

import os
import requests


def patch_race_url(*args):
    """
    Patch l'url de la vidéo de la course
    :param args: Id de la course, Url de la vidéo
    :return: none
    """
    response = patch_api_url_race(*args)
    if response.status_code == 401:
        response = patch_api_url_race(*args)

    if response.status_code != 200:
        raise Exception("Cannot insert url")


def patch_api_url_race(id_race: int, video_url: str):
    """
    Patch l'url de la vidéo de la course
    :param id_race: Id de la course
    :param video_url: Url de la vidéo
    :return: none
    """
    return requests.patch(os.environ['API_URL'] + "race/",
                          headers={"Authorization": "Bearer " + str(api_token.get_token())},
                          json={"id_race": id_race, "video_url": video_url})

import os
import requests

from api_voiture import api_token


def patch_race_url(race_id: int, url: str):
    response = requests.patch(os.environ['API_URL'] + "race/", headers={"Authorization": "Bearer " + str(api_token.get_token())}, json={"id": race_id, "url": url})
    if response.status_code == 401:
        response = requests.patch(os.environ['API_URL'] + "race/", headers={"Authorization": "Bearer " + str(api_token.get_new_token())}, json={"id": race_id, "url": url})

    if response.status_code != 200:
        raise Exception("Cannot insert url")


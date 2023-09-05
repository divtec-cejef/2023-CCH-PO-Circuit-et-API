from dotenv import load_dotenv

import requests
import os

token = ""


async def get_token():
    global token
    if token == "":
        try:
            token = await get_token_from_race()
        except Exception as e:
            print(e)
    return token


async def get_new_token():
    global token
    token = ""
    return get_token()


async def get_token_from_race():
    load_dotenv()
    response = requests.post(os.environ['API_URL'] + "authentication/car/",
                            json={"section": os.environ['SECTION_NAME'],
                                  "password": os.environ['SECTION_PASSWORD']})

    if response.status_code == 200:
        return response.json()['token']
    else:
        raise Exception("Error while getting token")

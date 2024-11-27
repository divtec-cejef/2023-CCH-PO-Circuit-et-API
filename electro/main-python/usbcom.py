import serial
import socketio
import requests
import time

# Variables globales
raceStarted = False
actualCarID = ""
startTime = None
distance = 50 # Distance entre les deux capteurs

# API
jelastic_api = 'https://voiture.divtec.me/api/'

dictionary = {
    "query_id": None,
    "race_finish": None,
    "sector1": None,
    "sector2": None,
    "speed": None
}

authentification = {
    "section": "race",
    "password": "Ch10r3.0d1n3tt3?G1@Ut0b_1nF$G@3tM1c!G1g@Ju1_313c",
    "token": None
}

res = requests.post(jelastic_api + "authentication/section/", json=authentification)
print(res.json())
authentification["token"] = res.json()["token"]
print(authentification["token"])
token_str = "Bearer " + str(authentification["token"])
print(token_str)

# Se connecte au seveur socketio
sio = socketio.Client()
sio.connect("http://localhost:3000")

# Configure le port
ser = serial.Serial()
ser.baudrate = 9600
ser.port = "COM3"

# Ouvre le port et l'utilise
ser.open()
time.sleep(5)
print("Ready")

def get_id_car(Query_ID):
    res = requests.get(jelastic_api + "car/query-id/" + Query_ID)
    print(res)
    return res.json()["id_car"]

def get_bonus(id_car):
    res = requests.get(jelastic_api + "activity/by-car/" + str(id_car))
    json = res.json()
    bonus = []
    for test in json:
        if test['id_section'] not in bonus:
            bonus.append(test['id_section'])

    return bonus

@sio.on("newCar")
def newCar(id):
    global raceStarted, actualCarID, dictionary, ser
    if (raceStarted == False):
        raceStarted = True
        print("New car : " + str(id))
        actualCarID = str(id)
        print(actualCarID)
        dictionary["query_id"] = actualCarID
        print(get_bonus(get_id_car(actualCarID)))
        bonus = get_bonus(get_id_car(actualCarID))
        bonusStr = ",0,0,0,0,0,0,0,0"

        for id in bonus:
            newId = id * 2 + 1
            bonusStr = bonusStr[: newId] + "1" + bonusStr[newId + 1:]

        message = actualCarID + bonusStr
        print(message)
        ser.write(message.encode()) # Récupérer les bonus

while (True):
    # Attend un message, exemple (1111,01,0000)
    if (raceStarted == True):
        ser.read_until(b",")
        message = ser.read(7)
        print(message)
        message = message.decode()
        message = message.split(",") 

        if (int(message[0]) == 2):
            startTime = time.localtime()
            startTimeFormated = ("{:4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}.000Z".format(
                startTime.tm_year, startTime.tm_mon, startTime.tm_mday,
                startTime.tm_hour, startTime.tm_min, startTime.tm_sec))
            dictionary["race_start"] = startTimeFormated
        elif (int(message[0]) == 4 or int(message[0]) == 5):
            # Calculer le temps du secteur (ajout de minutes et secondes)
            added_minutes = int(message[1]) // 6000
            added_seconds = (int(message[1]) / 100) % 60
            sectorTime = time.localtime(time.mktime(startTime) + added_minutes * 60 + added_seconds)
            sectorTimeFormated = ("{:4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}.000Z".format(
                sectorTime.tm_year, sectorTime.tm_mon, sectorTime.tm_mday,
                sectorTime.tm_hour, sectorTime.tm_min, sectorTime.tm_sec))
            if int(message[0]) == 4:
                dictionary["sector1"] = sectorTimeFormated
            else:
                dictionary["sector2"] = sectorTimeFormated
        elif (message[0] == "06"):
            added_minutes = int(message[1]) // 6000
            added_seconds = (int(message[1]) / 100) % 60
            finishTime = time.localtime(time.mktime(startTime) + added_minutes * 60 + added_seconds)
            finishTimeFormated = ("{:4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}.000Z".format(
                finishTime.tm_year, finishTime.tm_mon, finishTime.tm_mday,
                finishTime.tm_hour, finishTime.tm_min, finishTime.tm_sec))
            dictionary["race_finish"] = finishTimeFormated
            dictionary["speed"] = (distance / (int(message[1]) / 100))
            # envoyer les temps
            r = requests.post(jelastic_api + "race/query-id/", headers={'Authorization': token_str}, json=dictionary)
            print(r.status_code)
            print(token_str)
            if (r.status_code == 401):
                res = requests.post(jelastic_api + "authentication/section/", json=authentification)
                authentification["token"] = res.json()['token']
                token_str = "Bearer " + str(authentification["token"])
                r = requests.post(jelastic_api + "race/query-id/", headers={'Authorization': token_str},
                                json=dictionary)
            print(r.json())
            
            raceStarted = False

ser.close()

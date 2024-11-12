import serial
import socketio

# Se connecte au seveur socketio
sio = socketio.Client()
sio.connect("http://localhost:3000")

@sio.on("newCar")
def newCar(id):
    print("New car : " + str(id))

while (True):
    pass

"""# Configure le port
ser = serial.Serial()
ser.baudrate = 9600
ser.port = "COM3"

# Ouvre le port et l'utilise
ser.open()

print(ser.read())
print(ser.read())
print(ser.read())
print(ser.read())

ser.close()"""


import serial;

ser = serial.Serial()
ser.baudrate = 19200
ser.port = "COM1"
ser.open()
ser.is_open
ser.close()
ser.is_open
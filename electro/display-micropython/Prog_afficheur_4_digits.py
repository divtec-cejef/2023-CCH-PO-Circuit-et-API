# Import necessary libraries
from neopixel import Neopixel
import machine, time
from machine import Timer, Pin, UART, ADC

# Initialize UART communication
uart_chrono = UART(0, baudrate=9600, tx=Pin(16), rx=Pin(17))
uart_chrono.init(bits=8, parity=None, stop=1)

# Initialize an ADC object for reading brightness
adc = ADC(Pin(26))

# Define a reset pin
reset = machine.Pin(18, machine.Pin.IN, machine.Pin.PULL_UP)

# Define the number of NeoPixels and initialize the strip
numpix = 288
strip = Neopixel(numpix, 0, 28, "GRB")
strip.brightness(150)

# Define RGB color values
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
orange = (255, 50, 0)
yellow = (255, 100, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
indigo = (243, 58, 106)
violet = (200, 0, 100)

# Define segments for 7-segment display
listSegMillierObj = [[0, 9],
                  [10, 19],
                  [20, 29],
                  [30, 39],
                  [40, 49],
                  [50, 59],
                  [60, 69]]

listSegCentaineObj = [[70, 79],
                  [80, 89],
                  [90, 99],
                  [100, 109],
                  [110, 119],
                  [120, 129],
                  [130, 139]]

listSegDizaineObj = [[148, 157],
                  [158, 167],
                  [168, 177],
                  [178, 187],
                  [188, 197],
                  [198, 207],
                  [208, 217]]

listSegUniteObj = [[218, 227],
                  [228, 237],
                  [238, 247],
                  [248, 257],
                  [258, 267],
                  [268, 277],
                  [278, 287]]

listSegDeuxPoints = [140, 143] #If you only want the bottom point 
#listSegDeuxPoints = [140, 147] If you want to use both points

# Initialize variables
color4 = black
color3 = black
color = black
color2 = black
led_color = red
data = 0
data2 = 0
stop = 0
old_stop = 0
running = 0

# Define bit masks for 7-segment display
bit0Mask= 0b00000001
bit1Mask= 0b00000010
bit2Mask= 0b00000100
bit3Mask= 0b00001000
bit4Mask= 0b00010000
bit5Mask= 0b00100000
bit6Mask= 0b01000000
bit7Mask= 0b10000000

bitMaskList = [bit0Mask, bit1Mask, bit2Mask, bit3Mask, bit4Mask, bit5Mask, bit6Mask, bit7Mask]

# Define patterns for the 7-segment display
septSegments = [0b0111111, 0b0000110, 0b1011011, 0b1001111, 0b1100110,
                0b1101101, 0b1111101, 0b0000111, 0b1111111, 0b1101111]

# Function to display a 4-digit number on the 7-segment display
def Display7Seg2DigitOpt(nombre):
    millier = (int(nombre[0]))
    centaine = (int(nombre[1]))
    dizaine = (int(nombre[2]))
    unite = (int(nombre[3]))
    for i in range(7):
        value_unite = septSegments[unite] & bitMaskList[i]
        value_dizaine = septSegments[dizaine] & bitMaskList[i]
        value_centaine = septSegments[centaine] & bitMaskList[i]
        value_millier = septSegments[millier] & bitMaskList[i]
        if (value_millier > 0):
            color = led_color
        else:
            color = black
        if (value_centaine > 0):
            color2 = led_color
        else:
            color2 = black

        if (value_dizaine > 0):
            color3 = led_color
        else:
            color3 = black
        if (value_unite > 0):
            color4 = led_color
        else:
            color4 = black

        # Set the colors for each segment, for each digits
        strip.set_pixel_line(listSegCentaineObj[i][0], listSegCentaineObj[i][1], color2)
        strip.set_pixel_line(listSegUniteObj[i][0], listSegUniteObj[i][1], color4)
        strip.set_pixel_line(listSegMillierObj[i][0], listSegMillierObj[i][1], color)
        strip.set_pixel_line(listSegDizaineObj[i][0], listSegDizaineObj[i][1], color3)
        strip.set_pixel_line(listSegDeuxPoints[0], listSegDeuxPoints[1], led_color)

        # Don't display unused digits
        if running == 1:
            strip.set_pixel_line(218, 287, black)
        if millier == 0:
            strip.set_pixel_line(0, 69, black)

# Clear the NeoPixel strip
strip.fill((0,0,0))
strip.show()

while True:
    if reset.value() == 0:
        # Reset the Raspberry pi nano
        machine.reset()
    #Read the pot value and update the brightness
    brightness = adc.read_u16()
    strip.brightness(brightness/257)
    #read the 4 last char, uart data
    data = uart_chrono.read(4)
    if (data != None):
        if (data != b'\x00'):
            data2 = (data.decode('utf-8'))
            print(data2)
            if data2 == 'rien':
                # Interpret different messages
                strip.fill((0,0,0))
            elif data2 == 'clrr':
                led_color = red
            elif data2 == 'clrg':
                led_color = green
            elif data2 == 'clro':
                led_color = orange
            elif data2 == 'clrb':
                led_color = blue
            elif data2 == 'run1':
                running = 1
            elif data2 == 'run2' :
                running = 0
            else :
                # Display the nummer
                Display7Seg2DigitOpt(data2)
            strip.show()

#!/bin/bash

# All requests are written to ~/debug.txt

# Argument handeling for Temperature Sensor
if [ $1 = "TemperatureSensor_1" ]; then
    if [ $2 = "currenttemperature" ]; then
            if [ $3 = "get" ]; then
            echo "TemperatureSensor_1 temperature get" >> ~/debug.txt
            input=$(curl -s "https://diycon.nl/Example/API/api.php?key=pass&dev=dhtsensor01&val=Temperature")
            echo $input >> ~/debug.txt
            echo $input
            fi
    fi

# Argument handeling for Humidity Sensor
elif [ $1 = "HumiditySensor_1" ]; then
    if [ $2 = "currentrelativehumidity" ]; then
            if [ $3 = "get" ]; then
            echo "HumiditySensor_1 humidity get" >> ~/debug.txt
                        input=$(curl -s "https://diycon.nl/Example/API/api.php?key=pass&dev=dhtsensor01&val=Humidity")
            echo $input >> ~/debug.txt
            echo $input
            fi
    fi
fi

exit 0

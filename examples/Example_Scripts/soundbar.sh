#!/bin/bash

#Script to control the Yamaha YAS-306 with homebridge-commander
# input="test"
# Argument handeling for Power and Volume
if [ $1 = "Power" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            if curl -s http://10.11.12.2/YamahaExtendedControl/v1/main/getStatus | grep -q '"power":"on"'; then
                echo true
            else
                echo false
            fi
        elif [ $3 = "set" ]; then
            if [ $4 = true ]; then
                curl http://10.11.12.2/YamahaExtendedControl/v1/main/setPower?power=on
            else
                curl http://10.11.12.2/YamahaExtendedControl/v1/main/setPower?power=standby
            fi
        fi
    elif [ $2 = "brightness" ]; then
        if [ $3 = "get" ]; then
            input=$(curl -s http://10.11.12.2/YamahaExtendedControl/v1/main/getStatus)
            IFS=':'
            array=( $input )
            IFS=','
            volume=( ${array[3]} )
            echo ${volume[0]}
        elif [ $3 = "set" ]; then
            curl -s http://10.11.12.2/YamahaExtendedControl/v1/main/setVolume?volume=$4
        fi
    fi
elif [ $1 = "Radio" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            if curl -s http://10.11.12.2/YamahaExtendedControl/v1/main/getStatus | grep -q '"input":"net_radio"'; then
                echo true
            else
                echo false
            fi
        elif [ $3 = "set" ]; then
            curl http://10.11.12.2/YamahaExtendedControl/v1/main/setInput?input=net_radio
            curl http://10.11.12.2/YamahaExtendedControl/v1/netusb/setPlayback?playback=play
        fi
    fi
elif [ $1 = "Spotify" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            if curl -s http://10.11.12.2/YamahaExtendedControl/v1/main/getStatus | grep -q '"input":"spotify"'; then
                echo true
            else
                echo false
            fi
        elif [ $3 = "set" ]; then
            curl http://10.11.12.2/YamahaExtendedControl/v1/main/setInput?input=spotify
        fi
    fi
elif [ $1 = "TV" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            if curl -s http://10.11.12.2/YamahaExtendedControl/v1/main/getStatus | grep -q '"input":"tv"'; then
                echo true
            else
                echo false
            fi
        elif [ $3 = "set" ]; then
            curl http://10.11.12.2/YamahaExtendedControl/v1/main/setInput?input=tv
        fi
    fi
fi

exit 0
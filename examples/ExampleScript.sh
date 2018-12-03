#!/bin/bash

# Example script.
# All different devices could have a individually file 

# All requests are written to ~/debug.txt

# Argument handeling for SwitchName
if [ $1 = "SwitchName" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            echo "SwitchName PowerState get" >> ~/debug.txt
            echo true # Change this value to change PowerState
        elif [ $3 = "set" ]; then
            echo "SwitchName PowerState set to" $4 >> ~/debug.txt
        fi
    fi

# Argument handeling for LightbulbName_1
elif [ $1 = "LightbulbName_1" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            echo "LightbulbName_1 PowerState get" >> ~/debug.txt
            echo true # Change this value to change PowerState
        elif [ $3 = "set" ]; then
            echo "LightbulbName_1 PowerState set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "brightness" ]; then
            if [ $3 = "get" ]; then
            echo "LightbulbName_1 Brightness get" >> ~/debug.txt
            echo 60 # Change this value to change Brightness
        elif [ $3 = "set" ]; then
            echo "LightbulbName_1 brightness set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "saturation" ]; then
            if [ $3 = "get" ]; then
            echo "LightbulbName_1 Saturation get" >> ~/debug.txt
            echo 80 # Change this value to change Saturation
        elif [ $3 = "set" ]; then
            echo "LightbulbName_1 Saturation set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "hue" ]; then
            if [ $3 = "get" ]; then
            echo "LightbulbName_1 Hue get" >> ~/debug.txt
            echo 80 # Change this value to change Hue
        elif [ $3 = "set" ]; then
            echo "LightbulbName_1 Hue set to" $4 >> ~/debug.txt
        fi
    fi

# Argument handeling for LightbulbName_2
elif [ $1 = "LightbulbName_2" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            echo "LightbulbName_2 PowerState get" >> ~/debug.txt
            echo false # Change this value to change PowerState
        elif [ $3 = "set" ]; then
            echo "LightbulbName_2 PowerState set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "brightness" ]; then
        if [ $3 = "get" ]; then
            echo "LightbulbName_2 Brightness get" >> ~/debug.txt
            echo 75 # Change this value to change PowerState
        elif [ $3 = "set" ]; then
            echo "LightbulbName_2 brightness set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "colortemperature" ]; then
        if [ $3 = "get" ]; then
            echo "LightbulbName_2 Color Temperature get" >> ~/debug.txt
            echo 300 # Change this value to change Color Temperature
        elif [ $3 = "set" ]; then
            echo "LightbulbName_2 Color Temperature set to" $4 >> ~/debug.txt
        fi
    fi

# Argument handeling for OutletName
elif [ $1 = "OutletName" ]; then
    if [ $2 = "powerstate" ]; then
        if [ $3 = "get" ]; then
            echo "OutletName PowerState get" >> ~/debug.txt
            echo true # Change this value to change PowerState
        elif [ $3 = "set" ]; then
            echo "OutletName PowerState set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "outletinuse" ]; then
        if [ $3 = "get" ]; then
            echo "OutletName Outlet in Use get" >> ~/debug.txt
            echo false # Change this value to change Outlet in Use
        fi
    fi

# Argument handeling for SpeakerName
elif [ $1 = "SpeakerName" ]; then
    if [ $2 = "mute" ]; then
        if [ $3 = "get" ]; then
            echo "SpeakerName Mute get" >> ~/debug.txt
            echo false # Change this value to change mute
        elif [ $3 = "set" ]; then
            echo "SpeakerName Mute set to" $4 >> ~/debug.txt
        fi
    elif [ $2 = "volume" ]; then
        if [ $3 = "get" ]; then
            echo "SpeakerName Volume get" >> ~/debug.txt
            echo 30 # Change this value to change the volume
        elif [ $3 = "set" ]; then
            echo "SpeakerName volume set to" $4 >> ~/debug.txt
        fi
    fi
fi

exit 0
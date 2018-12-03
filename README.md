# homebridge-commander [![npm version](https://badge.fury.io/js/homebridge-commander.svg)](https://badge.fury.io/js/homebridge-commander)
CLI plug-in for [HomeBridge](https://github.com/nfarina/homebridge)

By default homebridge-commander will execute the cmd listed in the config with default arguments. The default arguments are the name of the command (given name from config.json), the type of command (powerstate, brightness, etc.) the action (get or set), and the value (only with set command).

See ExampleScript.sh in the example directory. This script can be used for all commands configurated.
It is possible to have a seperate script for each command.

Command call:
```
 cmd command_name command_type action value
 
 example: 
 ExampleScript.sh SwitchName powerstate set true
```

The arguments can be turned off by setting the no_arg value to true

## Supported types (More will be added soon)
- Switch
- Lightbulb
- Outlet
- Speaker

## Config.json settings
Platform config settings. See config.json in the example directory.

```
"platforms": [
         {
            "platform": "commander",
            "name": "PlatformName",
            "commands": [{
                "name" : "command_name",
                "type" : one of the following:
                         "switch"
                         "lightbulb"
                         "outlet"
                         "speaker"
                "cmd" : "path to command or command"
                "no_arg" : false
                "updaterate" : 5000
                }]
         }]
```
| Setting | Description | Required |  
| ------------- | --- | --- |
| `"platform"` | Should be set to "commander" | yes |
| `"name"` | Platform name changeable for user | yes |
| `"commands` | List of commands | yes |
| `"name"`  |  User given name of the command  |  yes  |
| `"type"`  |  Which type the command needs to appear in HomeKit  |  yes  |
| `"cmd"`  |  Executed command (can be bash script)  |  yes  |
| `"no_arg"`  |  Let the plugin execute the command without arguments. Default false when not listed   |  no  |
| `"updaterate"` | Update rate to get status in miliseconds (default 5000) | no |


### Switch
Switch has no additional settings.

Switch has the following command_types config:

| command_types | get | set | description |   
| ------------- | --- | --- | ----------- |
| `powerstate`  |  X  |  X  | true for on |

Example of a switch command:
```
"commands": [{
    "name": "SwitchName",
    "type": "switch",
    "cmd" : "~/ExampleScript.sh"
    }
```

### Lightbulb
Set the listed settings to true to have them active in Homekit

Lightbulb supports hue and saturation or colortemperture.
When hue or saturation is set to true colortemperature will be disabled.

Use the Hue and Saturation for color settings and Color Temperature for ambient settings.

```
"brightness" : true,
"hue" : true,
"saturation" : true,
```
or
```
"brightness" : true,
"colortemperature" : true,
```
Lightbulb has the following command_types :

| command_types | get | set | description |  
| ------------- | --- | --- | ----------- |
| `powerstate`  |  X  |  X  | true for on |
| `brightness`  |  X  |  X  | brightness in 0-100% |
| `hue`  |  X  |  X  | hue in 0-360 arcdegrees |
| `saturation`  |  X  |  X  | saturation in 0-100% |
| `colortemperature`  |  X  |  X  | color temperature 50-400 MK |

Example of a lightbulb command config (without Color Temperature):
```
"commands": [{
    "name": "LightBulbName",
    "type": "lightbulb",
    "cmd" : "~/ExampleScript.sh"
    "brightness" : true,
    "hue" : true,
    "saturation" : true,
    }
```

### Outlet
Outlet has no additional settings.

Outlet has the following command_types :

| command_types | get | set | description |   
| ------------- | --- | --- | ----------- |
| `powerstate`  |  X  |  X  | true for on |
| `outletinuse`  |  X  |  -  | true for in use |

Example of a switch command config:
```
"commands": [{
    "name": "OutletName",
    "type": "outlet",
    "cmd" : "~/ExampleScript.sh"
    }
```

### Speaker
Set the listed settings to true to have them active in Homekit
```
"volume" : true,
```
Speaker has the following command_types :

| command_types | get | set | description |  
| ------------- | --- | --- | ----------- |
| `mute`  |  X  |  X  | true for mute |
| `volume`  |  X  |  X  | volume in 0-100 |

Example of a speaker command config:
```
"commands": [{
    "name": "SpeakerName",
    "type": "speaker",
    "cmd" : "~/ExampleScript.sh"
    "volume" : true,
    }
```




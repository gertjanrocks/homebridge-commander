# homebridge-commander
Simple CLI plug-in for homebridge

By default homebridge-commander will execute the cmd listed in the config with default arguments. The default arguments are the name of the command (given name from config.json), the type of command (PowerState, Brightness, etc.) the action (get or set), and the value (only by set command).

```
 cmd command_name command_type action value
```

The arguments can be turned off by setting the no_arg value to true

## Supported types
- Switch
- Lightbulb
- Outlet
- Speaker

## Config.json settings
Basic commands settings. See config.json in the example directory. 
```
"name" : "Name",
"type" : one of the following:
         "switch"
         "lightbulb"
         "outlet"
         "speaker"
"cmd" : "path to command or command"
"no_arg" : false
"updaterate" : 5000

```
| Setting | Description | Required |  
| ------------- | --- | --- |
| `"name"`  |  User Name of the command  |  yes  |
| `"type"`  |  Which tyoe the command needs to appear in HomeKit  |  yes  |
| `"cmd"`  |  Executed command (can be bash script)  |  yes  |
| `"no_arg"`  |  Let the plugin execute the command without arguments. Is false when when not listed   |  no  |
| `"updaterate"` | Update rate to get status in miliseconds (default 5000) | no |


### Switch
Switch has no additional settings.
Switch has the following command_types :

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

Use the Hue and Saturation for color settings and colortemperature for ambient settings.

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

Example of a lightbulb command (without Color Temperature):
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

Example of a switch command:
```
"commands": [{
    "name": "OutletName",
    "type": "outlet",
    "cmd" : "~/ExampleScript.sh"
    }
```

### Optional for Speaker
Set the listed settings to true to have them active in Homekit
```
"volume" : true,
```



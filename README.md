# homebridge-commander
Simple CLI plug-in for homebridge

By default homebridge-commander will execute the cmd listed in the config with default arguments. The default arguments are the name of the command (given name from config.json), the type of command (PowerState, Brightness, etc.) the action (get or set), and the value (only by set command).

```
 cmd command_name command_type acion value
```

The arguments can be turned off by setting the no_arg value to true

## Supported types
- Switch
- Lightbulb
- Outlet
- Speaker

## Config.json settings
```
"name" : "Name",
"type" : one of the following:
         "switch"
         "lightbulb"
         "outlet"
         "speaker"
"cmd" : 
"no_arg" : false

```

### Optional for Lightbulb
Set the listed settings to true to have them active in Homekit
```
"brightness" : true,
"hue" : true,
"saturatiuon" : true,
"colortemperature" : true,
```
(note: Arguments will be added)

### Optional for Speaker
Set the listed settings to true to have them active in Homekit
```
"volume" : true,
```



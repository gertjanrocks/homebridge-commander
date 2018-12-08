
var Service;
var Characteristic;

module.exports = function (commander, commanderService, commanderCharacteristic) {
  Service = commanderService;
  Characteristic = commanderCharacteristic;
}

//Add the service to wanted command
module.exports.addService = function(that) {
    //Log the type
    that.log("Adding", that.name, "as", that.type);
    //Chose the wanted service
    switch (that.type)
    {
        case "switch":
        {
            that.service = new Service.Switch(that.name);
            break;
        }
        case "lightbulb":
        {
            that.service = new Service.Lightbulb(that.name);
            break;
        }
        case "outlet":
        {
            that.service = new Service.Outlet(that.name);
            break;
        }
        case "speaker":
        {
            that.service = new Service.Speaker(that.name);
            break;
        }
        case "windowcovering":
        {
            that.service = new Service.WindowCovering(that.name);
            break;
        }
    }
  }

module.exports.addCharacteristic = function(that) {
    //Check each Characteristic.
    //Some are required, some are optional

    //PowerState
    if( (that.type == "switch")     ||
        (that.type == "lightbulb")  ||
        (that.type == "outlet")     ||
        (that.custom && that.settings.powerstate))
    {
        that.service.getCharacteristic(Characteristic.On)
        .on('set', that.setPowerState.bind(that))
        .on('get', that.getPowerState.bind(that));
    }

    //Brightness
    if( ((that.type == "lightbulb") && that.settings.brightness) ||
        (that.custom && that.settings.brightness))
    {
        that.service.getCharacteristic(Characteristic.Brightness)
        .on('set', that.setBrightness.bind(that))
        .on('get', that.getBrightness.bind(that));
    }

    //Hue
    if( ((that.type == "lightbulb") && that.settings.hue) ||
        (that.custom && that.settings.hue))
    {
        that.service.getCharacteristic(Characteristic.Hue)
        .on('set', that.setHue.bind(that))
        .on('get', that.getHue.bind(that));
    }

    //Saturation
    if( ((that.type == "lightbulb") && that.settings.saturation) ||
        (that.custom && that.settings.saturation))
    {
        that.service.getCharacteristic(Characteristic.Saturation)
        .on('set', that.setSaturation.bind(that))
        .on('get', that.getSaturation.bind(that));
    }

    //ColorTemperature
    if( ((that.type == "lightbulb") && that.settings.colortemperature) ||
        (that.custom && that.settings.colortemperature))
    {
        that.service.getCharacteristic(Characteristic.ColorTemperature)
        .on('set', that.setColorTemperature.bind(that))
        .on('get', that.getColorTemperature.bind(that));
    }

    //OutletInUse
    if( (that.type == "outlet") ||
        (that.custom && that.settings.outletinuse))
    {
        that.service.getCharacteristic(Characteristic.OutletInUse)
        .on('get', that.getOutletInUse.bind(that));
    }

    //Mute
    if( (that.type == "speaker") ||
        (that.custom && that.settings.mute))
    {
        that.service.getCharacteristic(Characteristic.Mute)
        .on('set', that.setMute.bind(that))
        .on('get', that.getMute.bind(that));
    }

    //Volume
    if( ((that.type == "speaker") && that.settings.volume) ||
        (that.custom && that.settings.volume))
    {
        that.service.getCharacteristic(Characteristic.Volume)
        .on('set', that.setVolume.bind(that))
        .on('get', that.getVolume.bind(that));
    }

    //CurrentPosition
    if( (that.type == "windowcovering") ||
        (that.custom && that.settings.currentposition))
    {
        that.service.getCharacteristic(Characteristic.CurrentPosition)
        .on('get', that.getCurrentPosition.bind(that))
    }

    //TargetPosition
    if( (that.type == "windowcovering") ||
        (that.custom && that.settings.targetposition))
    {
        that.service.getCharacteristic(Characteristic.TargetPosition)
        .on('set', that.setTargetPosition.bind(that))
        .on('get', that.getTargetPosition.bind(that));
    }

    //PositionState
    if( (that.type == "windowcovering") ||
        (that.custom && that.settings.positionstate))
    {
        that.service.getCharacteristic(Characteristic.PositionState)
        .on('get', that.getPositionState.bind(that))
    }

    //HoldPosition
    if( ((that.type == "windowcovering") && that.settings.holdposition)||
        (that.custom && that.settings.holdposition))
    {
        that.service.getCharacteristic(Characteristic.HoldPosition)
        .on('set', that.setHoldPosition.bind(that))
    }

    //TargetHorizontalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.targethorizontaltiltangle) ||
        (that.custom && that.settings.targethorizontaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.TargetHorizontalTiltAngle)
        .on('set', that.setTargetHorizontalTiltAngle.bind(that))
        .on('get', that.getTargetHorizontalTiltAngle.bind(that));
    }

    //TargetVerticalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.targetverticaltiltangle) ||
        (that.custom && that.settings.targetverticaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.TargetVerticalTiltAngle)
        .on('set', that.setTargetVerticalTiltAngle.bind(that))
        .on('get', that.getTargetVerticalTiltAngle.bind(that));
    }

    //CurrentHorizontalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.currenthorizontaltiltangle) ||
        (that.custom && that.settings.currenthorizontaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.CurrentHorizontalTiltAngle)
        .on('get', that.getCurrentHorizontalTiltAngle.bind(that));
    }

    //CurrentVerticalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.currentverticaltiltangle) ||
        (that.custom && that.settings.currentverticaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.CurrentVerticalTiltAngle)
        .on('get', that.getCurrentVerticalTiltAngle.bind(that));
    }

    //ObstructionDetected
    if( ((that.type == "windowcovering") && that.settings.obstructiondetected) ||
        (that.custom && that.settings.obstructiondetected))
    {
        that.service.getCharacteristic(Characteristic.ObstructionDetected)
        .on('get', that.getObstructionDetected.bind(that));
    }
   
  }

  module.exports.updateStatus = function(that) {
    //Funtion to call each status
    //Some are required, some are optional

    //PowerState
    if( (that.type == "switch")     ||
        (that.type == "lightbulb")  ||
        (that.type == "outlet")     ||
        (that.custom && that.settings.powerstate))
    {
        that.service.getCharacteristic(Characteristic.On).getValue();
    }

    //Brightness
    if( ((that.type == "lightbulb") && that.settings.brightness) ||
        (that.custom && that.settings.brightness))
    {
        that.service.getCharacteristic(Characteristic.Brightness).getValue();
    }

    //Hue
    if( ((that.type == "lightbulb") && that.settings.hue) ||
        (that.custom && that.settings.hue))
    {
        that.service.getCharacteristic(Characteristic.Hue).getValue();
    }

    //Saturation
    if( ((that.type == "lightbulb") && that.settings.saturation) ||
        (that.custom && that.settings.saturation))
    {
        that.service.getCharacteristic(Characteristic.Saturation).getValue();
    }

    //ColorTemperature
    if( ((that.type == "lightbulb") && that.settings.colortemperature) ||
        (that.custom && that.settings.colortemperature))
    {
        that.service.getCharacteristic(Characteristic.ColorTemperature).getValue();
    }

    //OutletInUse
    if( (that.type == "outlet") ||
        (that.custom && that.settings.outletinuse))
    {
        that.service.getCharacteristic(Characteristic.OutletInUse).getValue();
    }

    //Mute
    if( (that.type == "speaker") ||
        (that.custom && that.settings.mute))
    {
        that.service.getCharacteristic(Characteristic.Mute).getValue();
    }

    //Volume
    if( ((that.type == "speaker") && that.settings.volume) ||
        (that.custom && that.settings.volume))
    {
        that.service.getCharacteristic(Characteristic.Volume).getValue();
    }

    //CurrentPosition
    if( (that.type == "windowcovering") ||
        (that.custom && that.settings.currentposition))
    {
        that.service.getCharacteristic(Characteristic.CurrentPosition).getValue();
    }

    //TargetPosition
    if( (that.type == "windowcovering") ||
        (that.custom && that.settings.targetposition))
    {
        that.service.getCharacteristic(Characteristic.TargetPosition).getValue();
    }

    //PositionState
    if( (that.type == "windowcovering") ||
        (that.custom && that.settings.positionstate))
    {
        that.service.getCharacteristic(Characteristic.PositionState).getValue();
    }

    //HoldPosition
    if( ((that.type == "windowcovering") && that.settings.holdposition)||
        (that.custom && that.settings.holdposition))
    {
        that.service.getCharacteristic(Characteristic.HoldPosition).getValue();
    }

    //TargetHorizontalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.targethorizontaltiltangle) ||
        (that.custom && that.settings.targethorizontaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.TargetHorizontalTiltAngle).getValue();
    }

    //TargetVerticalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.targetverticaltiltangle) ||
        (that.custom && that.settings.targetverticaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.TargetVerticalTiltAngle).getValue();
    }

    //CurrentHorizontalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.currenthorizontaltiltangle) ||
        (that.custom && that.settings.currenthorizontaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.CurrentHorizontalTiltAngle).getValue();
    }

    //CurrentVerticalTiltAngle
    if( ((that.type == "windowcovering") && that.settings.currentverticaltiltangle) ||
        (that.custom && that.settings.currentverticaltiltangle))
    {
        that.service.getCharacteristic(Characteristic.CurrentVerticalTiltAngle).getValue();
    }

    //ObstructionDetected
    if( ((that.type == "windowcovering") && that.settings.obstructiondetected) ||
        (that.custom && that.settings.obstructiondetected))
    {
        that.service.getCharacteristic(Characteristic.ObstructionDetected).getValue();
    }
   
  }
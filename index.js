"use strict";
var exec = require("child_process").exec;
var Service;
var Characteristic;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerPlatform("homebridge-commander", "commander", commanderPlatform);
}

function commanderPlatform(log, config) {
  // Register the log
  this.log = log;

  // Get all the commands
  this.config = config || {"platform": "commander"};
}

//Read and add accessories
commanderPlatform.prototype.accessories = function(callback) {
  var that = this;

  that.log("Reading config file");
  that.accessories = [];
    
    // Loop trough all commands to add
  that.config.commands.forEach(function(command){
    that.accessories.push(new commanderCommand(that.log, command));
  });
  callback(that.accessories);
}

function commanderCommand(log, commandConfig) {

  //Basic settings
  this.log = log;
  this.config = commandConfig;
  this.name = commandConfig.name;
  this.updaterate = commandConfig.updaterate || 5000;
  this.type = commandConfig.type;
  this.cmd = commandConfig.cmd;
  this.no_arg = commandConfig.no_arg || false;

  //Optinal settings for different types
  this.settings = [];
  //Lightbulb  
  this.settings.brightness = commandConfig.brightness || false;
  this.settings.hue = commandConfig.hue || false;
  this.settings.saturation = commandConfig.saturation || false;
  this.settings.colortemperature = commandConfig.colortemperature || false;
  if(this.settings.hue || this.settings.saturation){
    this.settings.colortemperature = false;
  }
  //Speaker
  this.settings.volume = commandConfig.volume || false;
  //Window Covering
  this.settings.holdposition = commandConfig.holdposition || false;
    
  this.log("Adding command",this.name, "as", this.type, "...");

  //Switch state to select the wanted service
  switch(this.type)
  {
    case "switch":
    {
      //Required setting
      this.service = new Service.Switch(this.name);
      this.service.getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this))
      .on('get', this.getPowerState.bind(this));
      break;
    }
    case "lightbulb":
    {
      //Required setting
      this.service = new Service.Lightbulb(this.name);
      this.service.getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this))
      .on('get', this.getPowerState.bind(this));
      //Optional if "brightness" is true
      if(this.settings.brightness) {
        this.service.getCharacteristic(Characteristic.Brightness)
        .on('set', this.setBrightness.bind(this))
        .on('get', this.getBrightness.bind(this));
      }
      //Optional if "hue" is true
      if(this.settings.hue) {
        this.service.getCharacteristic(Characteristic.Hue)
        .on('set', this.setHue.bind(this))
        .on('get', this.getHue.bind(this));
      }
      //Optional if "saturation" is true
      if(this.settings.saturation) {
        this.service.getCharacteristic(Characteristic.Saturation)
        .on('set', this.setSaturation.bind(this))
        .on('get', this.getSaturation.bind(this));
      }
      //Optional if "colortemperature" is true
      if(this.settings.colortemperature) {
        this.service.getCharacteristic(Characteristic.ColorTemperature)
        .on('set', this.setColorTemperature.bind(this))
        .on('get', this.getColorTemperature.bind(this));
      }
      break;
    }      
    case "outlet":
    {
      //Required setting
      this.service = new Service.Outlet(this.name);
      this.service.getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this))
      .on('get', this.getPowerState.bind(this));
      this.service.getCharacteristic(Characteristic.OutletInUse)
      .on('get', this.getOutletInUse.bind(this));
      break;
    }
    case "speaker":
    {
      //Required setting
      this.service = new Service.Speaker(this.name);
      this.service.getCharacteristic(Characteristic.Mute)
      .on('set', this.setMute.bind(this))
      .on('get', this.getMute.bind(this));
      //Optional if "volume" is true
      if(this.settings.volume) {
        this.service.getCharacteristic(Characteristic.Volume)
        .on('set', this.setVolume.bind(this))
        .on('get', this.getVolume.bind(this));
      }
      break;
    }
    case "windowcovering":
    {
      //Required setting
      this.service = new Service.WindowCovering(this.name);
      this.service.getCharacteristic(Characteristic.CurrentPosition)
      .on('get', this.getCurrentPosition.bind(this));
      //Required setting
      this.service.getCharacteristic(Characteristic.TargetPosition)
      .on('set', this.setTargetPosition.bind(this))
      .on('get', this.getTargetPosition.bind(this));
      //Required setting
      this.service.getCharacteristic(Characteristic.PositionState)
      .on('get', this.getPositionState.bind(this));
      //Optional if "holdposition" is true
      if(this.settings.holdposition) {
        this.service.getCharacteristic(Characteristic.HoldPosition)
        .on('set', this.setHoldPosition.bind(this));
      }
      //Optional if "targethorizontaltiltangle" is true
      if(this.settings.targethorizontaltiltangle) {
        this.service.getCharacteristic(Characteristic.TargetHorizontalTiltAngle)
        .on('set', this.setTargetHorizontalTiltAngle.bind(this))
        .on('get', this.getTargetHorizontalTiltAngle.bind(this));
      }
      // //Optional if "saturation" is true
      // if(this.settings.saturation) {
      //   this.service.getCharacteristic(Characteristic.Saturation)
      //   .on('set', this.setSaturation.bind(this))
      //   .on('get', this.getSaturation.bind(this));
      // }
      // //Optional if "colortemperature" is true
      // if(this.settings.colortemperature) {
      //   this.service.getCharacteristic(Characteristic.ColorTemperature)
      //   .on('set', this.setColorTemperature.bind(this))
      //   .on('get', this.getColorTemperature.bind(this));
      // }
      break;
    }
  }

  //Start the update service
  setTimeout(this.updateStatus.bind(this), this.updaterate);
}

//Get service function. This used for every added command
commanderCommand.prototype.getServices = function() {
  var informationService = new Service.AccessoryInformation();
  informationService
  .setCharacteristic(Characteristic.Manufacturer, "Rocks")
  .setCharacteristic(Characteristic.Model, this.name)
  .setCharacteristic(Characteristic.SerialNumber, this.type);
  return [informationService, this.service];
}


commanderCommand.prototype.updateStatus = function() {
  var that = this;

  //Select the wanted get service for each type
  switch(that.type)
  {
    case "switch":
    {
      this.service.getCharacteristic(Characteristic.On).getValue();
      break;
    }
    case "lightbulb":
    {
      this.service.getCharacteristic(Characteristic.On).getValue();
      //Set optional statuses
      if(this.settings.brightness) {
        this.service.getCharacteristic(Characteristic.Brightness).getValue();
      }
      if(this.settings.hue) {
        this.service.getCharacteristic(Characteristic.Hue).getValue();
      }
      if(this.settings.saturation) {
        this.service.getCharacteristic(Characteristic.Saturation).getValue();
      }
      if(this.settings.colortemperature) {
        this.service.getCharacteristic(Characteristic.ColorTemperature).getValue();
      }
      break;
    }
    case "outlet":
    {
      this.service.getCharacteristic(Characteristic.On).getValue();
      this.service.getCharacteristic(Characteristic.OutletInUse).getValue();
      break;
    }
    case "speaker":
    {
      this.service.getCharacteristic(Characteristic.Mute).getValue();
      if(this.settings.volume){
        this.service.getCharacteristic(Characteristic.Volume).getValue();
      }
      break;
    }
  }

  //Restart the timed update function
  setTimeout(function() {
    that.updateStatus();
  }, this.updaterate);
}

var Characteristics = require('./lib/characteristics')
commanderCommand.prototype.getPowerState = Characteristics.getPowerState;
commanderCommand.prototype.setPowerState = Characteristics.setPowerState;

commanderCommand.prototype.getBrightness = Characteristics.getBrightness;
commanderCommand.prototype.setBrightness = Characteristics.setBrightness;

commanderCommand.prototype.getSaturation = Characteristics.getSaturation;
commanderCommand.prototype.setSaturation = Characteristics.setSaturation;

commanderCommand.prototype.getHue = Characteristics.getHue;
commanderCommand.prototype.setHue = Characteristics.setHue;

commanderCommand.prototype.getColorTemperature = Characteristics.getColorTemperature;
commanderCommand.prototype.setColorTemperature = Characteristics.setColorTemperature;

commanderCommand.prototype.getOutletInUse = Characteristics.getOutletInUse;

commanderCommand.prototype.getMute = Characteristics.getMute;
commanderCommand.prototype.setMute = Characteristics.setMute;

commanderCommand.prototype.getVolume = Characteristics.getVolume;
commanderCommand.prototype.setVolume = Characteristics.setVolume;

commanderCommand.prototype.getCurrentPosition = Characteristics.getCurrentPosition;

commanderCommand.prototype.getTargetPosition = Characteristics.getTargetPosition;
commanderCommand.prototype.setTargetPosition = Characteristics.setTargetPosition;

commanderCommand.prototype.getPositionState = Characteristics.getPositionState;

commanderCommand.prototype.setHoldPosition = Characteristics.setHoldPosition;
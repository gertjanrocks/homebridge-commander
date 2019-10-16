"use strict";
var exec = require("child_process").exec;
var Service;
var Characteristic;
var Services;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerPlatform("homebridge-commander", "commander", commanderPlatform);
}

function commanderPlatform(log, config) {
  // Register the log
  this.log = log;

  Services = require('./lib/services');
  Services(this,Service, Characteristic);

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
  this.custom = commandConfig.custom || false;

  //Read optional settings from config
  this.settings = [];
  //Statussen
  this.settings.statusactive = commandConfig.statusactive || false;
  this.settings.statusfault = commandConfig.statusfault || false;
  this.settings.statuslowbattery = commandConfig.statuslowbattery || false;
  this.settings.statustampered = commandConfig.statustampered || false;
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
  this.settings.targethorizontaltiltangle = commandConfig.targethorizontaltiltangle || false;
  this.settings.targetverticaltiltangle = commandConfig.targetverticaltiltangle || false;
  this.settings.currenthorizontaltiltangle = commandConfig.currenthorizontaltiltangle || false;
  this.settings.currentverticaltiltangle = commandConfig.currentverticaltiltangle || false;
  this.settings.obstructiondetected = commandConfig.obstructiondetected || false;
  //Custom (Are default for other but not for costum)
  this.settings.powerstate = commandConfig.powerstate || false;
  this.settings.outletinuse = commandConfig.outletinuse || false;
  this.settings.mute = commandConfig.mute || false;
  this.settings.currentposition = commandConfig.currentposition || false;
  this.settings.targetposition = commandConfig.targetposition || false;
  this.settings.positionstate = commandConfig.positionstate || false;
  this.settings.currenttemperature = commandConfig.currenttemperature || false;
  
  //Add the service defined on type
  Services.addService(this);
  //Add the required and optional characteritics to the service
  Services.addCharacteristic(this);

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

//Update the status
commanderCommand.prototype.updateStatus = function() {
  var that = this;

  //Call update funcion
  Services.updateStatus(that);
  
  //Restart the timed update function
  setTimeout(function() {
    that.updateStatus();
  }, this.updaterate);
}

//
// Couple all Characteristics funtions.
//
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
commanderCommand.prototype.getTargetHorizontalTiltAngle = Characteristics.getTargetHorizontalTiltAngle;
commanderCommand.prototype.setTargetHorizontalTiltAngle = Characteristics.setTargetHorizontalTiltAngle;
commanderCommand.prototype.getTargetVerticalTiltAngle = Characteristics.getTargetVerticalTiltAngle;
commanderCommand.prototype.setTargetVerticalTiltAngle = Characteristics.setTargetVerticalTiltAngle;
commanderCommand.prototype.getCurrentHorizontalTiltAngle = Characteristics.getCurrentHorizontalTiltAngle;
commanderCommand.prototype.getCurrentVerticalTiltAngle = Characteristics.getCurrentVerticalTiltAngle;
commanderCommand.prototype.getObstructionDetected = Characteristics.getObstructionDetected;
commanderCommand.prototype.getCurrentTemperature = Characteristics.getCurrentTemperature;
commanderCommand.prototype.getStatusActive = Characteristics.getStatusActive;
commanderCommand.prototype.getStatusFault = Characteristics.getStatusFault;
commanderCommand.prototype.getStatusLowBattery = Characteristics.getStatusLowBattery;
commanderCommand.prototype.getStatusTampered = Characteristics.getStatusTampered;

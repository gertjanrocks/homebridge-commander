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


//
//  PowerState Get and Set is used for:
//    Switch, Lightbulb, Outlet
//
commanderCommand.prototype.getPowerState = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " powerstate" + " get";
  }
  // Execute command to get PowerState
  exec(cmd, function (error, stdout, stderr) {
    //Get Powerstate
    that.powerState = (stdout.trim() === "true") ? true : false; 
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.powerState);
    }
  });
}

commanderCommand.prototype.setPowerState = function(state, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " powerstate " + "set " + state;
  }  
  // Execute command to set PowerState
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"PowerState changed to",state);
      error = null;
      that.powerState = state;
    }
  });
  that.getPowerState(callback);
}

//
//  Brightness Get and Set is used for:
//    Lightbulb
//
commanderCommand.prototype.getBrightness = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " brightness" + " get";
  }
  // Execute command to get brightness
  exec(cmd, function (error, stdout, stderr) {
    //Get brightness
    that.brightness = parseInt(stdout);  
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.brightness);
    }
  });
}

commanderCommand.prototype.setBrightness = function(value, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " brightness " + "set " + value;
  }  
  // Execute command to set Brightness
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"Brightness changed to",value);
      error = null;
      that.brightness = value;
    }
  });
  that.getBrightness(callback);
}

//
//  Saturation Get and Set is used for:
//    Lightbulb
//
commanderCommand.prototype.getSaturation = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " saturation" + " get";
  }
  // Execute command to get Saturation
  exec(cmd, function (error, stdout, stderr) {
    //Get saturation
    that.saturation = parseInt(stdout);  
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.saturation);
    }
  });
}

commanderCommand.prototype.setSaturation = function(value, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " saturation " + "set " + value;
  }  
  // Execute command to set Saturation
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"Saturation changed to",value);
      error = null;
      that.saturation = value;
    }
  });
  that.getSaturation(callback);
}

//
//  Hue Get and Set is used for:
//    Lightbulb
//
commanderCommand.prototype.getHue = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " hue" + " get";
  }
  // Execute command to get Hue
  exec(cmd, function (error, stdout, stderr) {
    //Get hue
    that.hue = parseInt(stdout);  
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.hue);
    }
  });
}

commanderCommand.prototype.setHue = function(value, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " hue " + "set " + value;
  }  
  // Execute command to set Hue
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"Hue changed to",value);
      error = null;
      that.hue = value;
    }
  });
  that.getHue(callback);
}

//
//  Color Temperature Get and Set is used for:
//    Lightbulb
//
commanderCommand.prototype.getColorTemperature = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " colortemperature" + " get";
  }
  // Execute command to get Color Temperature
  exec(cmd, function (error, stdout, stderr) {
    //Get colortemperature
    that.colortemperature = parseInt(stdout);  
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.colortemperature);
    }
  });
}

commanderCommand.prototype.setColorTemperature = function(value, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " colortemperature " + "set " + value;
  }  
  // Execute command to set Color Temperature
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"Color Temperature changed to",value);
      error = null;
      that.colortemperature = value;
    }
  });
  that.getColorTemperature(callback);
}

//
//  Outlet in use Get is used for:
//    Outlet
//
commanderCommand.prototype.getOutletInUse = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " outletinuse" + " get";
  }
  // Execute command to get Outlet in use
  exec(cmd, function (error, stdout, stderr) {
    //Get Outlet in use
    that.outletinuse = (stdout.trim() === "true") ? true : false;
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.outletinuse);
    }
  });
}


//
//  Mute Get and Set is used for:
//    Speaker
//
commanderCommand.prototype.getMute = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " mute" + " get";
  }
  // Execute command to get mute
  exec(cmd, function (error, stdout, stderr) {
    //Get mute
    that.mute = (stdout.trim() === "true") ? true : false;
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.mute);
    }
  });
}

commanderCommand.prototype.setMute = function(state, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " mute " + "set " + state;
  }  
  // Execute command to set Mute
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"Mute changed to",state);
      error = null;
      that.mute = state;
    }
  });
  that.getMute(callback);
}

//
//  Volume Get and Set is used for:
//    Speaker
//
commanderCommand.prototype.getVolume = function(callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " volume" + " get";
  }
  // Execute command to get the Volume
  exec(cmd, function (error, stdout, stderr) {
    //Get volume
    that.volume = parseInt(stdout);  
    // Error detection
    if (stderr) {
      that.log("Failed to excecute get command for",that.name);
      that.log(stderr);
    }
    if (callback) {
      callback(stderr, that.volume);
    }
  });
}

commanderCommand.prototype.setVolume = function(value, callback) {
  var that = this;
  var cmd = that.cmd;

  // Add arguments
  if(!that.no_arg){
    cmd += " " + that.name + " volume " + "set " + value;
  }  
  // Execute command to set volume
  exec(cmd, function (error, stdout, stderr) {
    // Error detection
    if (error) {
      that.log("Failed to execute set command for",that.name);
      that.log(stderr);
    } else {
      if (cmd) that.log(that.name,"Volume changed to",value);
      error = null;
      that.volume = value;
    }
  });
  that.getVolume(callback);
}
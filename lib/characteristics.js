"use strict";
var exec = require("child_process").exec;

//
//  PowerState Get and Set is used for:
//    Switch, Lightbulb, Outlet
//
exports.getPowerState = function(callback) {
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

exports.setPowerState = function(state, callback) {
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
exports.getBrightness = function(callback) {
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
  
  exports.setBrightness = function(value, callback) {
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
  exports.getSaturation = function(callback) {
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
  
  exports.setSaturation = function(value, callback) {
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
  exports.getHue = function(callback) {
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
  
  exports.setHue = function(value, callback) {
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
  exports.getColorTemperature = function(callback) {
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
  
  exports.setColorTemperature = function(value, callback) {
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
  exports.getOutletInUse = function(callback) {
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
  exports.getMute = function(callback) {
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
  
  exports.setMute = function(state, callback) {
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
  exports.getVolume = function(callback) {
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
  
  exports.setVolume = function(value, callback) {
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
  
  //
  //  CurrentPosition Get is used for:
  //    Window Covering
  //
  exports.getCurrentPosition = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " " + that.name + " currentposition" + " get";
    }
    // Execute command to get the Current Position
    exec(cmd, function (error, stdout, stderr) {
      //Get Current Position
      that.currentposition = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.currentposition);
      }
    });
  }
  
  //
  //  TargetPosition Get and Set is used for:
  //    Speaker
  //
  exports.getTargetPosition = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " " + that.name + " targetposition" + " get";
    }
    // Execute command to get the Target Position
    exec(cmd, function (error, stdout, stderr) {
      //Get Target Position
      that.targetposition = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.targetposition);
      }
    });
  }
  
  exports.setTargetPosition = function(value, callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " " + that.name + " targetposition " + "set " + value;
    }  
    // Execute command to set Target Position
    exec(cmd, function (error, stdout, stderr) {
      // Error detection
      if (error) {
        that.log("Failed to execute set command for",that.name);
        that.log(stderr);
      } else {
        if (cmd) that.log(that.name,"Target Position changed to",value);
        error = null;
        that.targetposition = value;
      }
    });
    that.getTargetPosition(callback);
  }
  
  //
  //  Position State Get is used for:
  //    Window Covering
  //
  exports.getPositionState = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " " + that.name + " positionstate" + " get";
    }
    // Execute command to get the Position State
    exec(cmd, function (error, stdout, stderr) {
      //Get Position state
      that.positionstate = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.psoitionstate);
      }
    });
  }
  
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
      cmd += " '" + that.name + "' powerstate" + " get";
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
      cmd += " '" + that.name + "' powerstate " + "set " + state;
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
      cmd += " '" + that.name + "' brightness" + " get";
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
      cmd += " '" + that.name + "' brightness " + "set " + value;
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
      cmd += " '" + that.name + "' saturation" + " get";
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
      cmd += " '" + that.name + "' saturation " + "set " + value;
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
      cmd += " '" + that.name + "' hue" + " get";
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
      cmd += " '" + that.name + "' hue " + "set " + value;
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
      cmd += " '" + that.name + "' colortemperature" + " get";
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
      cmd += " '" + that.name + "' colortemperature " + "set " + value;
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
      cmd += " '" + that.name + "' outletinuse" + " get";
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
      cmd += " '" + that.name + "' mute" + " get";
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
      cmd += " '" + that.name + "' mute " + "set " + state;
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
      cmd += " '" + that.name + "' volume" + " get";
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
      cmd += " '" + that.name + "' volume " + "set " + value;
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
      cmd += " '" + that.name + "' currentposition" + " get";
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
      cmd += " '" + that.name + "' targetposition" + " get";
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
      cmd += " '" + that.name + "' targetposition " + "set " + value;
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
      cmd += " '" + that.name + "' positionstate" + " get";
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
  
//
//  Hold Position Set is used for:
//    Window Covering
//
exports.setHoldPosition = function(state, callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' holdposition " + "set " + state;
    }  
    // Execute command to set Hold position
    exec(cmd, function (error, stdout, stderr) {
      // Error detection
      if (error) {
        that.log("Failed to execute set command for",that.name);
        that.log(stderr);
      } else {
        if (cmd) that.log(that.name,"Hold Position changed to",state);
        error = null;
        that.holdposition = state;
      }
    });
}

//
//  TargetHorizontalTiltAngle Get and Set is used for:
//    Window Covering
//
exports.getTargetHorizontalTiltAngle = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' targethorizontaltiltangle" + " get";
    }
    // Execute command to get the Target Horizontal Tilt Angle
    exec(cmd, function (error, stdout, stderr) {
      //Get Target Position
      that.targethorizontaltiltangle = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.targethorizontaltiltangle);
      }
    });
}
  
exports.setTargetHorizontalTiltAngle = function(value, callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' targethorizontaltiltangle " + "set " + value;
    }  
    // Execute command to set Target Position
    exec(cmd, function (error, stdout, stderr) {
      // Error detection
      if (error) {
        that.log("Failed to execute set command for",that.name);
        that.log(stderr);
      } else {
        if (cmd) that.log(that.name,"Target Horizontal Tilt Angle changed to",value);
        error = null;
        that.targethorizontaltiltangle = value;
      }
    });
    that.getTargetHorizontalTiltAngle(callback);
}

//
//  TargetVerticalTiltAngle Get and Set is used for:
//    Window Covering
//
exports.getTargetVerticalTiltAngle = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' targetverticaltiltangle" + " get";
    }
    // Execute command to get the Target Vertical Tilt Angle
    exec(cmd, function (error, stdout, stderr) {
      //Get Target Position
      that.targetverticaltiltangle = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.targetverticaltiltangle);
      }
    });
}
  
exports.setTargetVerticalTiltAngle = function(value, callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' targetverticaltiltangle " + "set " + value;
    }  
    // Execute command to set Target Position
    exec(cmd, function (error, stdout, stderr) {
      // Error detection
      if (error) {
        that.log("Failed to execute set command for",that.name);
        that.log(stderr);
      } else {
        if (cmd) that.log(that.name,"Target Vertical Tilt Angle changed to",value);
        error = null;
        that.targetverticaltiltangle = value;
      }
    });
    that.getTargetVerticalTiltAngle(callback);
}

//
//  Current Horizontal Tilt Angle Get is used for:
//    Window Covering
//
exports.getCurrentHorizontalTiltAngle = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' currenthorizontaltiltangle" + " get";
    }
    // Execute command to get the Current Horizontal Tilt Angle
    exec(cmd, function (error, stdout, stderr) {
      //Get Current Horizontal Tilt Angle
      that.currenthorizontaltiltangle = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.currenthorizontaltiltangle);
      }
    });
}

//
//  Current Vertical Tilt Angle Get is used for:
//    Window Covering
//
exports.getCurrentVerticalTiltAngle = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' currentverticaltiltangle" + " get";
    }
    // Execute command to get the Current Vertical Tilt Angle
    exec(cmd, function (error, stdout, stderr) {
      //Get Current Vertical Tilt Angle
      that.currentverticaltiltangle = parseInt(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.currentverticaltiltangle);
      }
    });
}

//
//  Obstruction Detected Get is used for:
//    Window Covering
//
exports.getObstructionDetected = function(callback) {
    var that = this;
    var cmd = that.cmd;
  
    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' obstructiondetected" + " get";
    }
    // Execute command to get Obstruction Detected
    exec(cmd, function (error, stdout, stderr) {
      //Get Obstruction Detected
      that.obstructiondetected = (stdout.trim() === "true") ? true : false;
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.obstructiondetected);
      }
    });
}

//
//  CurrentTemperature Get is used for:
//    Temerature Sensor
//
exports.getCurrentTemperature = function(callback) {
    var that = this;
    var cmd = that.cmd;

    // Add arguments
    if(!that.no_arg){
      cmd += " '" + that.name + "' currenttemperature" + " get";
    }
    // Execute command to get Temperature
    exec(cmd, function (error, stdout, stderr) {
      //Get Temperature
      that.currenttemperature = parseFloat(stdout);  
      // Error detection
      if (stderr) {
        that.log("Failed to excecute get command for",that.name);
        that.log(stderr);
      }
      if (callback) {
        callback(stderr, that.currenttemperature);
      }
    });
}

var exec = require("child_process").exec;
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
  Accessory = homebridge.platformAccessory;
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;

  homebridge.registerPlatform("homebridge-commander", "commander", commanderPlatform, true);
}

function commanderPlatform(log, config, api) {
  log("Commander Platform init");
  // Register the log
  this.log = log;

  // Get all the commands
  this.config = config || {"platform": "commander"};
  //this.commands = this.config.commands || [];

  //Empty lists
  this.commands = {};
  this.polling = {};

}

commanderPlatform.prototype = {
  accessories: function(callback) {
    this.log("Reading config file");
    
    // Loop trough all commands to add
    for (var i = 0; i < this.config.commands.length; i++)
    {
       this.log("Register %s",this.config.commands[i].name);
    }

    callback(this.commands);
  }
}
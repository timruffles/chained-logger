;(function() {

var INFO = 0;
var LOG = 1;
var WARN = 2;
var ERROR = 3;

var methodsToLevels = {
  debug: INFO,
  info: INFO,
  warn: WARN,
  error: ERROR,
  log: LOG,
}

function Log(prefix, level) {
  this.prefix = prefix || "";
  if(level != null) {
    this.logLevel = nameToLevel(level);
  }
}

Object.keys(methodsToLevels).forEach(function(method) {

  var orignalMethodName = getMethodName(method);

  Log.prototype[method] = function delegateToConsole() {
    if(methodsToLevels[method] >= this.logLevel) {
      var rest = [].slice.call(arguments,1);
      var first = arguments[0];
      console[orignalMethodName].apply(console,[this.prefix + first].concat(rest));
    }
  }
});

Log.prototype.enabled = function(method) {
    return nameToLevel(method) >= this.logLevel;
};

Log.prototype.setLogLevel = function(method) {
  this.logLevel = nameToLevel(method);
};

Log.prototype.logLevel = LOG;

Log.prototype.create = function(pref, level) {
  var log = Object.create(this);
  Log.call(log, this.prefix + pref, level);
  return log;
};


var defaultLogger = new Log();

if(typeof module != "undefined") {
  module.exports = defaultLogger;
} else {
  window.chainedLogger = defaultLogger; 
}


// to support aliases like debug
function getMethodName(method) {
  if(method === "debug") return "info";
  return method;
}
function nameToLevel(method) {
  method = getMethodName(method);
  var level = methodsToLevels[method];
  if(level == null) {
    throw new Error("Unknown log level " + method);
  }
  return level;
}

})();

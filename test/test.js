var log = require("../index");

log.log("logging from exported module");
log.debug("shouldn't see this - low log level");

log.setLogLevel("debug");
log.debug("log level raised - should see");

log.console = log.NULL_CONSOLE;
log.debug("shouldn't see this - logging disabled");

var childLog = log.create("[hi] ");
childLog.console = console;
childLog.debug("child log using own console");

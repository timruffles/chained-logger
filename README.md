# ChainedLogger

Logging library designed to be used with standard 12 factor 'log to stdout' methods, and as close to `console` as possible. Loggers chain their parent's prefix and log level.

`debug` is provided as a synonym for `info`.

## Basic usage

```javascript
var log = require("chained-logger");

log.debug("low level detail");
log.log("something interesting");
log.warn("something worrying");
log.error("something really bad!!");

log.info("synonym for debug");

if(process.env.LOG_LEVEL) {
  log.setLogLevel(process.env.LOG_LEVEL);
}
```

## Install

Node:

```javascript
npm install --save chained-logger
```

Browser:

```javascript
<script src=chained-logger.js></script>
<script>
// exposed as window.chainedLogger;
</script>
```

## Levels

```javascript
var log = require("chained-logger");
log.setLogLevel("debug");
log.enabled("debug"); // true

log.setLogLevel("error");
log.enabled("debug"); // false
log.enabled("info"); // false
log.enabled("warn"); // false
log.enabled("log"); // false
```

The order is DEBUG < LOG < WARN < ERROR.

### Inheritence

Log-level is inherited from the neartest parent logger with a log-level set. To create a child logger use `logger.create()`.

```javascript
var log = require("chained-logger");

var child = log.create();
var grandChild = child.create();

log.setLogLevel("error");
child.enabled("warn"); // false
grandChild.enabled("warn"); // false

child.setLogLevel("warn"); 
grandChild.enabled("warn"); // true
```

## Prefix

It's nice to know where your logs are coming from:

```javascript
var log = require("chained-logger").create("[server] ");

log.debug("request") // '[server] request'

var put = log.create("[put] ");
put.debug("request") // '[server] [put] request'
```

Timeout Handler
===============

This is a nice way of handling timeouts without having to worry about fiddling in javasript

Usage
-----
```javascript
const TimeoutHandler = require('TimeoutHandler')
const th = new TimeoutHandler()

th.setTimeout('key', ()=>{}, 10)
th.setInterval('key', ()=>{}, 10) //Overwrites the original key, cancelling it
th.cancel('key')

th.getTimers() // returns all timers that are currently set
```

#!/usr/bin/env node
/**
 * a CLI for sending message to adaptive cards in Teams
 * 
 * @module app
 */

var argv = require("./lib/argv");
var send = require("./lib/send");

send.send(argv.message, {
    title: argv.title,
    webhook: argv.webhook,
    debug: argv.debug
});

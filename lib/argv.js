/**
 * parse command line arguments
 *
 * @module lib/argv
 */
module.exports = require("yargs")
  .option("message", {
    alias: "m",
    type: "string",
    description: "message to send",
    required: true,
  })
  .option("title", {
    alias: "t",
    type: "string",
    description: "title of the message",
    required: false,
  })
  .option("webhook", {
    alias: "w",
    type: "string",
    description: "webhook url (or set env ACARDBOT_WEBHOOK)",
    default: process.env.ACARDBOT_WEBHOOK,
    required: true,
  })
  .option("debug", {
    alias: "d",
    type: "boolean",
    description: "show debug output",
    default: false,
  }).argv;

/**
 * send a card via. adaptive card api
 *
 * @module lib/send
 */

/* jshint esversion: 6 */
// default parameters, template literal syntax

var axios = require("axios").default;

/**
 * Send a message with the Adaptive Cards API.
 *
 * webhook must either be defined in the module, or provided to
 * this function or else an error will be thrown.
 *
 * @param {string}  message         message to send
 * @param {object}  options         additional options
 * @param {string}  options.webhook webhook url [required]
 * @param {boolean} options.debug   print console.debug output
 * @param {string}  options.title   title of the card
 */
module.exports.send = function (
  message,
  options = {
    webhook: this.webhook,
    debug: this.debug,
  }
) {
  // set webhook to this.webhook if option not passed in.
  // webhook is REQUIRED
  if (!options.webhook) {
    if (!this.webhook) {
      throw new Error("webhook not defined");
    } else {
      options.webhook = this.webhook;
    }
  }

  // set debug to this.debug if option not passed in.
  if (options.debug == undefined) {
    options.debug = this.debug;
  }

  var payload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0072C6", // light blue
    summary: "summary",
    sections: [
      {
        text: message,
      },
    ],
  };

  // add title, if provided
  if (options.title) {
    payload.sections[0].activityTitle = options.title;
  }

  var headers = {
    "content-type": "application/vnd.microsoft.teams.card.o365connector",
    "content-length": `${payload.toString().length}`,
  };

  if (options.debug) {
    console.debug(`lib/send.send:webhook: ${JSON.stringify(options.webhook)}`);
    console.debug(`lib/send.send:headers: ${JSON.stringify(headers)}`);
    console.debug(`lib/send.send:payload: ${JSON.stringify(payload)}`);
  }

  // async post
  axios
    .post(options.webhook, payload, {
      headers: headers,
    })
    .then(function (response) {
      if (options.debug) {
        console.debug(
          `lib/send.send:post:response: ${JSON.stringify(response)}`
        );
      }
    })
    .catch(function (err) {
      console.error(`Message not sent: ${err}`);
      if (options.debug) {
        console.debug(`lib/send.send:post:error: ${JSON.stringify(err)}`);
      }
    });
};

/**
 * Webhook URL
 *
 * @type {string}
 */
module.exports.webhook = undefined;

/**
 * Print debug output to console.debug while processing requests
 *
 * @type {boolean}
 */
module.exports.debug = false;

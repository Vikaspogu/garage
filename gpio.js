"use strict";

const rpio = require("rpio");
require("dotenv").config();

// default: 38-open, 11-relay
const openPin = process.env.OPEN_PIN || 38;
const relayPin = process.env.RELAY_PIN || 11;
let pins = [
  "40",
  "38",
  "37",
  "36",
  "35",
  "33",
  "32",
  "31",
  "29",
  "22",
  "18",
  "16",
  "15",
  "13",
  "12",
  "11",
];

rpio.open(openPin, rpio.INPUT, rpio.PULL_UP);
rpio.open(relayPin, rpio.OUTPUT, rpio.HIGH);

pins.forEach((element) => rpio.open(element, rpio.INPUT, rpio.PULL_UP));

module.exports = {
  pinState: () => {
    return !rpio.read(openPin);
  },

  getStateOfPins: () => {
    let pinsJson = [];
    pins.forEach((element) =>
      pinsJson.push({ element: !rpio.read(element) + " " + element })
    );
    return pinsJson;
  },

  toggleRelay: () => {
    // Simulate a button press
    rpio.write(relayPin, rpio.LOW);
    setTimeout(async function () {
      rpio.write(relayPin, rpio.HIGH);
    }, 1000);
    return;
  },
};

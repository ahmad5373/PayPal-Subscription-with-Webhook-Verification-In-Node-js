const express = require("express");
const Router = express.Router();

const paypalWebhook_controller = require("../controller/paypalWebhook_controller");

Router.post("/webhook", paypalWebhook_controller.paypalWebHook);

module.exports = Router;
const express = require("express");
const Router = express.Router();

const paypalSubscription_controller = require("../controller/paypalSubscription_controller");

Router.post('/create-subscription',paypalSubscription_controller.createSubscription);
Router.get('/subscriptions/:subscriptionId',paypalSubscription_controller.GetSubscription);
Router.patch('/subscriptions/:subscriptionId',paypalSubscription_controller.UpdateSubscription);
Router.post('/subscriptions/:subscriptionId/suspend',paypalSubscription_controller.SuspendSubscripton);
Router.post('/subscriptions/:subscriptionId/cancel',paypalSubscription_controller.CancelSubsctiption);
Router.post('/subscriptions/:subscriptionId/activate',paypalSubscription_controller.activateSubscription);

module.exports = Router;
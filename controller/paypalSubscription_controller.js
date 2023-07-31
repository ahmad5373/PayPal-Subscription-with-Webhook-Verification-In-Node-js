const axios = require("axios");
require('dotenv').config()

const accessToken = process.env.ACCESS_TOKEN;
PlanID = process.env.paypal_PLAN_ID
const payPalApiUrl = 'https://api-m.sandbox.paypal.com/v1/billing/subscriptions';

//End point to handle subscription creation 
exports.createSubscription = async (req, res) => {
    // const subscriptionData = req.body;
    let data = JSON.stringify({
        "plan_id": PlanID,
        "start_time": "2023-07-31T07:40:00Z",
        "shipping_amount": {
            "currency_code": "EUR",
            "value": "10.00"
        },
        "subscriber": {
            "name": {
                "given_name": "FooBuyer",
                "surname": "Jones"
            },
            "email_address": "foobuyer@example.com",
            "shipping_address": {
                "name": {
                    "full_name": "John Doe"
                },
                "address": {
                    "address_line_1": "2211 N First Street",
                    "address_line_2": "Building 17",
                    "admin_area_2": "San Jose",
                    "admin_area_1": "CA",
                    "postal_code": "95131",
                    "country_code": "US"
                }
            }
        },
        "application_context": {
            "brand_name": "Example Inc",
            "locale": "en-US",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "SUBSCRIBE_NOW",
            "payment_method": {
                "payer_selected": "PAYPAL",
                "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
            },
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    });
    try {
        const response = await axios.post(payPalApiUrl, data, {
            headers: {
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log("Subscription created successfully");
        //Extract the Approvel URL from the response data
        const approvelUrl = response.data.links.find(link => link.rel == 'approve').href;
        console.log("Redirecting user to :", approvelUrl);
        res.status(200).json({ message: "subscription created successfully", RedirectURL: approvelUrl });
        // res.redirect(approvelUrl)
    } catch (error) {
        console.log("Error Occurs while Creating Subscription", error.response.data);
        res.status(error.response.status || 500).json(error.response.data);
    }
};

//End Point to Get Subscription By ID
exports.GetSubscription = async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    try {
        const response = await axios.get(`${payPalApiUrl}/${subscriptionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.status(200).json({ Message: `Subscription data with id ${subscriptionId}`, Data: response.data });
    } catch (error) {
        console.log("Could not get subscription", error.response.data);
        res.status(error.response.status || 500).json(error.response.data);
    }
};

//End Point to Update a Subscription By ID
exports.UpdateSubscription = async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    let updatedData = req.body;
    try {
        const response = await axios.patch(`${payPalApiUrl}/${subscriptionId}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        res.status(200).json({ Message: `Update Subscription data with id ${subscriptionId}` });
    } catch (error) {
        console.log("Could not Update subscription", error.response.data);
        res.status(error.response.status || 500).json(error.response.data);
    }
};
//End Point to Suspend a Subscription By ID
exports.SuspendSubscripton = async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    let SuspendData = req.body;
    try {
        const response = await axios.post(`${payPalApiUrl}/${subscriptionId}/suspend`, SuspendData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        res.status(200).json({ Message: `Suspend Subscription data with id ${subscriptionId}` });
    } catch (error) {
        console.log("Could not Suspend subscription", error.response.data);
        res.status(error.response.status || 500).json(error.response.data);;
    }
};
//End Point to Cancel a Subscription By ID
exports.CancelSubsctiption = async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    let CanceldData = req.body;
    try {
        const response = await axios.post(`${payPalApiUrl}/${subscriptionId}/cancel`, CanceldData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        res.status(200).json({ Message: `Canceled Subscription data with id ${subscriptionId}` });
    } catch (error) {
        console.log("Could not Canceled subscription", error.response.data);
        res.status(error.response.status || 500).json(error.response.data);
    }
};
//End Point to Cancel a Subscription By ID
exports.activateSubscription = async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    let ActivatedData = req.body;
    try {
        const response = await axios.post(`${payPalApiUrl}/${subscriptionId}/activate`, ActivatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        res.status(200).json({ Message: `Activated Subscription data with id ${subscriptionId}` });
    } catch (error) {
        console.log("Could not Activated subscription", error.response.data);
        res.status(error.response.status || 500).json(error.response.data);
    }
};
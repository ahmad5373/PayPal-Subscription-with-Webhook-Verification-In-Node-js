const axios = require('axios')
require('dotenv').config()


// Verify webhook signature using PayPal API
async function isValidWebhook(request) {
    const headers = request.headers
    const webhookID = process.env.WEBHOOK_ID
    const accessToken = process.env.ACCESS_TOKEN
    try {
        const response = await axios.post('https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature', {
            transmission_id: headers['paypal-transmission-id'],
            transmission_time: headers['paypal-transmission-time'],
            cert_url: headers['paypal-cert-url'],
            auth_algo: headers['paypal-auth-algo'],
            transmission_sig: headers['paypal-transmission-sig'],
            webhook_id: webhookID,
            webhook_event: request.body,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        // Check if the verification response is valid
        if (response.status === 200 || response.status === 204) {
            console.log('Webhook signature Verified:', response.data)
            return true;
        } else {
            console.log("Webhook signature verification failed", response.status);
            return false
        }
    } catch (error) {
        console.log("Error Verifying webhook signature:", error.message);
        return false;
    }
}
module.exports = {
    isValidWebhook
}
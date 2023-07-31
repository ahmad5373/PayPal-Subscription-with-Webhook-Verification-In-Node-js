const { isValidWebhook } = require("../paypalWebhooksHandler");

exports.paypalWebHook =
    async (request) => {
        // Verify that the webhook is authentic
        if (!await isValidWebhook(request)) {
            console.log("This is not a valid webhook");
            throw new HttpException('Invalid webhook', HttpStatus.BAD_REQUEST);
        }
        console.log("Webhooks pass authentication");
        const event_type = request.body.event_type;
        console.log('Event type => ' + event_type);
        // Handle the event based on its type
        switch (event_type) {
            case 'BILLING.SUBSCRIPTION.ACTIVATED':
                console.log('A Subscription was Activated', request.body.resource);
                break;
            case 'BILLING.SUBSCRIPTION.UPDATED':
                console.log('A Subscription was Updated', request.body.resource);
                break;
            case 'BILLING.SUBSCRIPTION.CANCELLED':
                console.log('A Subscription was Cancelled', request.body.resource);
                break;
            case 'PAYMENT.SALE.COMPLETED':
                console.log('A recurring payment was completed', request.body.resource);
                break;
            case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
                console.log('A payment for the subscription failed', request.body.resource);
                break;
            case 'BILLING.SUBSCRIPTION.RE-ACTIVATED':
                console.log('A subscription was re-activated', request.body.resource);
                break;
            case 'BILLING.SUBSCRIPTION.SUSPENDED':
                console.log('A subscription was suspended', request.body.resource);
                break;
            default:
                console.log('Unknown event type: ' + event_type);
                break;
        }
    }

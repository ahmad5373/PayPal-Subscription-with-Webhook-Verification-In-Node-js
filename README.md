# PayPal-Subscription-with-Webhook-Verification-In-Node-js
This repository provides a sample implementation of PayPal Subscription using PayPal API and webhook verification
# Overview
This repository provides a sample implementation of PayPal Subscription using PayPal API and webhook verification. It demonstrates how to create and manage subscriptions on PayPal and verify the webhook events for successful subscription payments.

# Prerequisites
Before you begin, ensure you have the following:
PayPal Developer Account: Create an account on the PayPal Developer Dashboard and set up your sandbox credentials.
Node.js and npm: Make sure you have Node.js and npm installed on your machine.
Git: Install Git for version control.

# Getting Started
Follow these steps to get the project up and running:

# Clone the repository:
1: git clone https://github.com/ahmad5373/PayPal-Subscription-with-Webhook-Verification-In-Node-js
cd paypal-subscription-webhook
2:Install dependencies
npm install

# Configure PayPal API credentials:
Rename the .env.example file to .env.
Replace the placeholders in .env with your PayPal sandbox client ID and secret.

# Set up PayPal Webhook:
Log in to your PayPal Developer Dashboard.
Navigate to the sandbox account that will receive webhook events.
Create a new webhook, providing the appropriate URL of your server to receive webhook events.
In your .env file, update the WEBHOOK_ID with the ID of the created webhook.

# Run the application:
npm start
Navigate to http://localhost:3000 in your web browser. This will display a simple page with subscription options.

# Test the Subscription Flow:
Choose a subscription plan and proceed with the payment using the provided PayPal sandbox credentials.
Once the payment is successful, you should receive a webhook event notification.
The application will verify the webhook event using PayPal's signature verification.

# Important Notes
This is a basic implementation to demonstrate the PayPal subscription flow and webhook verification.
Ensure that your server is hosted with SSL enabled (HTTPS) to receive webhook events securely.
To test paypal webhook verification localy  you can also use ngrok  for temproray URL (HTTPS)
When deploying this code to production, switch the PayPal credentials and webhook URL to use the live environment instead of the sandbox.


# Contributions
Contributions to this repository are welcome! If you find any issues or want to add improvements, feel free to create a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

# Disclaimer
This project is provided as-is, without any warranty or guarantee. Use it at your own risk.

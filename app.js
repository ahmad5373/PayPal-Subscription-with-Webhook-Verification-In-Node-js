const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Subscription = require("./routes/paypalSubscription");
const webhook = require("./routes/paypalWebhook");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server is running on port 3000");
});

app.use("/paypal", Subscription)
app.use("/paypal", webhook)

//start the server
app.listen(port, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});

import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/create-payment", async (req, res) => {
  try {
    const response = await fetch("https://secure.paytabs.com/payment/request", {
      method: "POST",
      headers: {
        authorization: process.env.SERVER_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        profile_id: process.env.PROFILE_ID,
        tran_type: "sale",
        tran_class: "ecom",
        cart_id: Date.now().toString(),
        cart_description: "Order",
        cart_currency: "KWD",
        cart_amount: req.body.amount || 10,
        callback: "https://your-render-url.onrender.com/callback",
        return: "https://your-lovable-site/success",
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(10000, () => console.log("Server running"));

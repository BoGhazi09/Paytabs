import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// allow requests from your site (for now allow all)
app.use(cors({
  origin: "*",
}));

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
        cart_description: "Test Order",
        cart_currency: "KWD",
        cart_amount: 1,
        customer_details: {
          name: "Test User",
          email: "test@test.com",
          phone: "12345678"
        },
        callback: "https://paytabs-he4d.onrender.com/callback",
        return: "https://your-actual-site.lovable.app/success"
      }),
    });

    const data = await response.json();
    console.log("PayTabs response:", data);
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(10000, () => console.log("Server running"));

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
        cart_currency: req.body.currency || "USD",
        cart_amount: req.body.amount || 4.99,
        callback: "https://paytabs-he4d.onrender.com/callback",
        return: "https://your-actual-site.lovable.app/success",
      }),
    });

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

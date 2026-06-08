export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { reference } = req.body;
  
  if (!reference) {
    return res.status(400).json({ error: "Reference is required" });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "PAYSTACK_SECRET_KEY is missing! Go to Vercel Settings > Environment Variables, add your secret key as PAYSTACK_SECRET_KEY, and then RE-DEPLOY." });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      res.status(200).json({ status: "success", data: data.data });
    } else {
      res.status(400).json({ status: "failed", message: data.message || "Payment verification failed" });
    }
  } catch (error) {
    console.error("Paystack verification error:", error);
    res.status(500).json({ error: "An error occurred during payment verification." });
  }
}

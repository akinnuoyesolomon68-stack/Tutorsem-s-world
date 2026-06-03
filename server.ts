import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Route for Paystack Verification
  app.post("/api/verify-payment", async (req, res) => {
    const { reference } = req.body;
    
    if (!reference) {
      return res.status(400).json({ error: "Reference is required" });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ error: "Server misconfiguration: PAYSTACK_SECRET_KEY is missing." });
    }

    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      const data = await response.json();

      if (data.status && data.data.status === "success") {
        res.json({ status: "success", data: data.data });
      } else {
        res.status(400).json({ status: "failed", message: data.message || "Payment verification failed" });
      }
    } catch (error) {
      console.error("Paystack verification error:", error);
      res.status(500).json({ error: "An error occurred during payment verification." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

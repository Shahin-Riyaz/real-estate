import dotenv from "dotenv";
dotenv.config();
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);
  console.log("Loaded API KEY:", process.env.OPENROUTER_API_KEY);
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "RealEstateBot",
        },

        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          max_tokens: 100,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI assistant for a real estate website. Only answer real estate-related questions. Keep your answers short and to the point — ideally 1 to 2 sentences.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );
    console.log("API KEY:", process.env.OPENROUTER_API_KEY);
    const data = await response.json();

    console.log("Raw OpenRouter response:", data);

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      console.error("No choices returned:", data);
      res.status(500).json({ message: "No response from model", data });
    }
  } catch (err) {
    console.error("OpenRouter error:", err.message);
    res
      .status(500)
      .json({ message: "OpenRouter request failed", error: err.message });
  }
});

export default router;

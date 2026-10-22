export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const BOT_TOKEN = "8651119266:AAHCDXPLH_JY1AH5xRunAw0PZpA7RjRBmrg";
  const CHAT_ID = "-5332686054";

  try {
    // Парсим текст из запроса (x-www-form-urlencoded)
    let body = "";
    for await (const chunk of req) {
      body += chunk.toString();
    }
    const params = new URLSearchParams(body);
    const text = params.get("text");

    if (!text) {
      return res.status(400).send("No text provided");
    }

    // Отправляем текст в Telegram
    const tgFormData = new FormData();
    tgFormData.append("chat_id", CHAT_ID);
    tgFormData.append("text", text);

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      body: tgFormData,
    });

    if (tgResponse.ok) {
      return res.status(200).send("OK");
    } else {
      return res.status(500).send("TG Error");
    }
  } catch (e) {
    return res.status(500).send("Error: " + e.message);
  }
}

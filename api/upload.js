export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const BOT_TOKEN = "8651119266:AAHCDXPLH_JY1AH5xRunAw0PZpA7RjRBmrg";
  const CHAT_ID = "-5332686054";

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    const tgFormData = new FormData();
    tgFormData.append("chat_id", CHAT_ID);
    tgFormData.append("document", new Blob([buffer], { type: "application/zip" }), "report.zip");
    tgFormData.append("caption", "Новый лог");

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
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

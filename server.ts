import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "STUDIO_X API" });
});

// Chatbot API route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages payload." });
      return;
    }

    const systemInstruction = `You are STUDIO_X's official AI Concierge. STUDIO_X is an elite, high-performance digital design & technology atelier (founded in 2024 with flagship studios in New York, London, Tokyo, and Paris).

PRIMARY DIRECTIVE: You MUST ONLY talk about STUDIO_X, this website, its team, philosophy, services, process, and portfolio projects.

Key Facts about STUDIO_X to reference:
- Philosophy: "Elegance is the elimination of the non-essential." We craft bespoke digital ecosystems combining editorial luxury aesthetics with deep technical precision.
- Core Services:
  1. UI/UX & Design Systems (Editorial layout, motion guidelines, component libraries, accessibility compliance).
  2. Full-Stack Web Engineering (High-throughput Node/React/TypeScript, edge deployment, micro-animations, <100ms response targets).
  3. Brand Strategy & Direction (Identity positioning, sonic branding, spatial digital identity, creative direction).
  4. Motion & Interactive Experiences (WebGL/3D shaders, fluid canvas rendering, Framer Motion choreography).
- Key Projects in Portfolio:
  1. SMYLEXL (Healthcare / Dental Network): Responsive web experience designed for a multi-location dental clinic network focusing on patient education, trust-building, clinic locator, doctor credentials, and conversion-oriented booking flow.
  2. UNIQUE WHOLEFOOD (E-commerce / Health): Premium organic grocery storefront customized on Shopify for an Australian health retailer with optimized mobile discovery, product categorization, and click & collect support.
  3. CREATIVE PROPERTY STYLIST (Interior Design / Property Styling): A premium interior design and property styling website crafted to showcase professional home staging services, build client trust, and generate high-quality consultation enquiries through elegant design and visual storytelling.
  4. HOLY DENTAL CARE (Healthcare / Dental Clinic): A modern dental clinic website developed for a multi-specialty clinic in Mumbai designed to enhance patient trust, streamline appointment bookings, and deliver a seamless healthcare experience through a patient-centric, responsive layout.
- Process: 4 distinct phases — 01 Discovery & Strategy, 02 Architectural Design, 03 Engineering & Craft, 04 Launch & Evolution.
- Inquiries: Clients can start a project brief via the "Contact" tab on this site or request a customized proposal.

STRICT CONSTRAINTS:
- You are forbidden from answering general knowledge, trivia, coding tutorials, weather, sports, politics, or math queries.
- If asked an off-topic question, respond politely: "As STUDIO_X's AI Concierge, I am exclusively trained to answer questions regarding STUDIO_X, our design atelier, portfolio, services, and project inquiries. How can I assist you with your next digital project?"
- Keep responses concise, elegant, articulate, and well-structured.`;

    // Map message history into Gemini format
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const replyText = response.text || "I apologize, but I could not process your request at this time.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "Failed to generate AI response.",
      details: error.message,
    });
  }
});

// Contact Form API route (sends email using nodemailer)
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, service, budget, message } = req.body;

    if (!fullName || !email) {
      res.status(400).json({ error: "Name and email are required." });
      return;
    }

    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    const emailContent = `
      You have a new inquiry from STUDIO_X:

      - Name: ${fullName}
      - Email: ${email}
      - Service: ${service}
      - Budget: ${budget}
      - Message: ${message || "No message provided."}
    `;

    console.log("Processing email inquiry to abhashtripathi486@gmail.com:", emailContent);

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP credentials missing. Email logging simulation mode active.");
      res.json({ status: "simulated", message: "Inquiry logged to server console (Simulation Mode)." });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: "abhashtripathi486@gmail.com",
      subject: `New STUDIO_X Inquiry: ${service} from ${fullName}`,
      text: emailContent,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="border-bottom: 2px solid #f27d26; padding-bottom: 10px; color: #050505;">New STUDIO_X Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
              <td style="padding: 8px 0;">${budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${message || "No message provided."}</td>
            </tr>
          </table>
        </div>
      `,
    });

    res.json({ status: "success", message: "Inquiry sent successfully to abhashtripathi486@gmail.com" });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({
      error: "Failed to transmit email inquiry.",
      details: error.message,
    });
  }
});

// Vite Middleware for Development / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STUDIO_X Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

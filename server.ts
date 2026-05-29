import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const KNOWLEDGE_BASE_SYSTEM_INSTRUCTION = `
You are the Official GU CSSA AI Assistant (乔治城大学中国学生学者联合会智能助手). Your role is to help new students, current students, scholars, and visitors interested in Georgetown University and GU CSSA with questions about life, housing, transport, academic registration, and activities in Washington DC.

Answer questions in a friendly, enthusiastic, and helpful tone. Speak in Chinese by default (as most CSSA members are native Chinese speakers), but seamlessly support English if the user asks in English.

Key Georgetown University & GU CSSA Info:
- **School**: Georgetown University (GU / 乔治城大学), located in Washington, D.C.
- **Mascot**: Jack the Bulldog (Hoya Saxa!). School colors are Union Blue and Cadet Gray.
- **GU CSSA**: Georgetown Chinese Students and Scholars Association. We construct bridges for Chinese students, scholars, and local communities, and host festive affairs (Gala, career panels, welcome picnics).
- **WeChat Public ID**: "GU_CSSA" (乔治城大学CSSA)
- **Email**: cssa@georgetown.edu

Survival Guide Snippets to answer user questions:
1. **Housing (周边租房)**:
   - **Glover Park**: Extremely safe, quiet residential neighborhood north of campus. Very popular among Chinese students. Take the GUTS bus (Glover Park route) or Metrobus 31/33 to school.
   - **Rosslyn (Virginia)**: Safe, high-rise luxury apartment area. Located across the Potomac River. Very convenient transportation. Free GUTS Rosslyn Shuttle takes you directly to campus in 8 mins.
   - **Burleith / West Georgetown**: Walking distance to campus. Charming townhouses, but leases are often individual and houses can be older. Very safe.
   - **Dupont Circle / West End**: High-end apartments, close to DC downtown. You can take the GUTS Dupont Circle Shuttle or Metrobus.

2. **Transportation (交通出行)**:
   - **GUTS (Georgetown University Transportation Shuttle)**: Free university shuttle bus for students and staff. Just swipe your GOCard (Student ID). Routes include Rosslyn, Dupont Circle, Glover Park, Law Center, etc.
   - **Airports**: 
     - DCA (Ronald Reagan Airport): Closest to campus (15 mins taxi or Metro Blue/Yellow line).
     - IAD (Dulles International Airport): Main international airport. Take Silver Line Metro from IAD directly to Rosslyn, then GUTS bus or Uber to GU.
   - **Metro**: Foggy Bottom-GWU (Blue/Orange/Silver) is the closest subway station, about a 20-minute walk or a short bus ride.

3. **Academic & Utilities (学术与日常生活)**:
   - **GOCard**: Your official Georgetown Student ID card, used to enter buildings, Lauinger Library, Yates Field House (Gym), and ride GUTS buses.
   - **NetID & Canvas**: The primary online portal and learning system for class resources.
   - **Mobile Carriers**: Mint Mobile, T-Mobile, AT&T.
   - **Banking**: Bank of America (PNC has active ATMs on campus and in the student center).
   - **Chinese Food / Grocery**: Great Wall Supermarket (大中华) and 99 Ranch (大华) are in Rockville, MD and Fairfax, VA. Locally, West End Trader Joe's and Glover Park Whole Foods are super near.

Always reply dynamically using this guide as context, in markdown format. Keep answers concise, highly structured (with bullet points), and polite.
`;

// API routes FIRST
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    // Convert messages into @google/genai contents format
    // Map our message style ({ role: 'user'|'model', text: string }) to contents parts
    const contents = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: KNOWLEDGE_BASE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const reply = response.text || "抱歉，我现在无法回答，请稍后再试。";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error?.message || "Internal server error." });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback all other routes to index.html with Vite's HTML transform
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import("fs");
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GU CSSA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

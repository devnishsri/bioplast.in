import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Firebase Admin with graceful fallback
  let db: Firestore | null = null;
  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(configPath)) {
      const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (firebaseConfig.projectId) {
        initializeApp({
          projectId: firebaseConfig.projectId,
        });
        
        if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)") {
          db = getFirestore(firebaseConfig.firestoreDatabaseId);
        } else {
          db = getFirestore();
        }
        console.log(`Firebase Admin initialized successfully. Project: ${firebaseConfig.projectId}, Database ID: ${firebaseConfig.firestoreDatabaseId || "(default)"}`);
      } else {
        console.warn("Firebase project ID not found in firebase-applet-config.json. Falling back to local storage.");
      }
    } else {
      console.warn("firebase-applet-config.json not found. Falling back to local storage.");
    }
  } catch (err) {
    console.error("Failed to initialize Firebase Admin SDK. Falling back to local storage:", err);
  }

  // Contacts storage file path (used as fallback or primary if Firebase not initialized)
  const CONTACTS_FILE = path.join(process.cwd(), "contacts.json");

  // Helper to read contacts
  const readContacts = (): any[] => {
    try {
      if (!fs.existsSync(CONTACTS_FILE)) {
        return [];
      }
      const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading contacts file:", err);
      return [];
    }
  };

  // Helper to write contacts
  const writeContacts = (contacts: any[]) => {
    try {
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing contacts file:", err);
    }
  };

  // API Route: Submit contact inquiry
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        company,
        designation,
        productCategory,
        monthlyVolume,
        printingRequirement,
        message,
      } = req.body;

      // Basic validation
      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and phone are required fields.",
        });
      }

      // Generate a persistent quote reference ID
      const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      const quoteId = `BPI-2026-${randomHex}`;

      const newInquiry = {
        id: quoteId,
        name,
        email,
        phone,
        company: company || "",
        designation: designation || "",
        productCategory: productCategory || "carry-u",
        monthlyVolume: monthlyVolume || "500kg - 1000kg",
        printingRequirement: printingRequirement || "one-color",
        message: message || "",
        createdAt: new Date().toISOString(),
      };

      if (db) {
        // Save to Firestore
        await db.collection("contacts").doc(quoteId).set(newInquiry);
        console.log(`Inquiry successfully written to Firestore: ${quoteId}`);
      } else {
        // Fallback to local JSON storage
        const contacts = readContacts();
        contacts.push(newInquiry);
        writeContacts(contacts);
        console.log(`Inquiry saved successfully to local file fallback: ${quoteId}`);
      }

      return res.status(200).json({
        success: true,
        quoteId,
        data: newInquiry,
      });
    } catch (error: any) {
      console.error("Error processing contact inquiry:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Internal server error.",
      });
    }
  });

  // API Route: GET to retrieve contacts
  app.get("/api/contacts", async (req, res) => {
    try {
      if (db) {
        const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
        const contacts: any[] = [];
        snapshot.forEach((doc) => {
          contacts.push(doc.data());
        });
        return res.status(200).json({
          success: true,
          count: contacts.length,
          data: contacts,
        });
      } else {
        const contacts = readContacts();
        return res.status(200).json({
          success: true,
          count: contacts.length,
          data: contacts,
        });
      }
    } catch (error: any) {
      console.error("Error retrieving contacts:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to retrieve contacts.",
      });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

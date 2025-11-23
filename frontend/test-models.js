// Script para listar los modelos disponibles en tu API de Gemini
// Ejecuta este archivo con: node test-models.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("❌ Error: GOOGLE_API_KEY no está configurada en el archivo .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log("🔍 Consultando modelos disponibles...\n");
    
    // Intentar con diferentes modelos comunes
    const modelsToTest = [
      "gemini-2.0-flash-lite",
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-pro",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
    ];

    console.log("📋 Probando modelos:\n");

    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: "Hola" }] }],
        });
        
        console.log(`✅ ${modelName} - DISPONIBLE`);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log(`❌ ${modelName} - NO DISPONIBLE (404)`);
        } else if (error.message.includes("quota")) {
          console.log(`⚠️  ${modelName} - DISPONIBLE (pero sin cuota)`);
        } else {
          console.log(`❓ ${modelName} - ERROR: ${error.message.substring(0, 50)}...`);
        }
      }
    }

    console.log("\n💡 Tip: Usa el primer modelo que aparezca como ✅ DISPONIBLE");
    
  } catch (error) {
    console.error("❌ Error general:", error.message);
  }
}

listModels();

// src/services/aiChef.js
// Servicio para manejar la comunicación con Gemini AI

import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializar la IA con la API Key desde las variables de entorno
const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);

/**
 * Consulta al Chef IA para adaptar recetas según restricciones alimentarias
 * @param {string} mensajeUsuario - El mensaje/receta del usuario
 * @param {string} restriccion - La restricción alimentaria (vegano, sin-gluten, sin-lactosa)
 * @returns {Promise<string>} - La respuesta del Chef IA
 */
export async function consultarChef(mensajeUsuario, restriccion) {
  try {
    // Mapeo de restricciones a texto legible
    const restriccionTexto = restriccion || "sin restricciones específicas";

    // Construir el prompt completo con las instrucciones incluidas
    const promptCompleto = `Eres un Chef experto en adaptaciones alimentarias. Tu tono es amable y profesional.

RESTRICCIONES A APLICAR: ${restriccionTexto}

INSTRUCCIONES:
- Si el usuario pide una receta, entrégala completa (ingredientes y pasos) adaptada a las restricciones: ${restriccionTexto}
- Sé específico con las sustituciones de ingredientes
- Explica por qué cada cambio es necesario
- Mantén el sabor y la esencia de la receta original
- Si la receta ya cumple con la restricción, indícalo claramente
- Si el usuario solo conversa o saluda, responde brevemente como un asistente útil

MENSAJE DEL USUARIO:
${mensajeUsuario}`;

    // Configurar el modelo SIN systemInstruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    // Configuración de generación
    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    };

    // Generar respuesta
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptCompleto }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error al consultar a Gemini:", error);

    // Manejo de errores específicos
    if (error.message?.includes("API_KEY")) {
      return "⚠️ Error de configuración: No se pudo conectar con la IA. Por favor, verifica que la API Key esté configurada correctamente.";
    }

    if (error.message?.includes("quota")) {
      return "⚠️ Se ha alcanzado el límite de uso de la API. Por favor, intenta más tarde.";
    }

    if (error.message?.includes("404") || error.message?.includes("not found")) {
      return "⚠️ Error de modelo: El modelo de IA no está disponible. Por favor, verifica tu configuración de API.";
    }

    return "⚠️ Lo siento, hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.";
  }
}

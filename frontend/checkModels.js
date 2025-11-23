import { GoogleGenerativeAI } from "@google/generative-ai";

// RECUERDA PONER TU API KEY
const genAI = new GoogleGenerativeAI("TU_API_KEY_AQUI");

async function listModels() {
  try {
    const modelResponse = await genAI.getGenerativeModelFactory().listModels();
    
    console.log("Modelos disponibles:");
    console.log("-------------------");
    
    const models = modelResponse.models || modelResponse; 

    for (const model of models) {
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Nombre (ID): ${model.name}`); // ESTE ES EL QUE NECESITAS COPIAR
        console.log(`Versión: ${model.version}`);
        console.log(`Descripción: ${model.displayName}`);
        console.log("---");
      }
    }
  } catch (error) {
    console.error("Error al listar modelos:", error);
  }
}

listModels();
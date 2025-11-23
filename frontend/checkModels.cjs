const { GoogleGenerativeAI } = require("@google/generative-ai");

// Reemplaza con tu API KEY real o usa process.env.API_KEY
const genAI = new GoogleGenerativeAI("TU_API_KEY_AQUI");

async function listModels() {
  try {
    const modelResponse = await genAI.getGenerativeModelFactory().listModels();
    
    console.log("Modelos disponibles:");
    console.log("-------------------");
    
    // Iterar sobre los modelos encontrados
    // Nota: Dependiendo de la versión del SDK, puede devolver un array directo o un objeto con propiedad 'models'
    const models = modelResponse.models || modelResponse; 

    for (const model of models) {
      // Filtramos solo los que sirven para 'generateContent' (chat/texto)
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Nombre: ${model.name}`);
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
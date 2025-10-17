import React, { useState, useEffect, useRef } from "react";
// --- 1. IMPORTAMOS NUESTRA BASE DE DATOS FALSA ---
import { mockResponses } from "../data/mockDatabase.js";

// --- Componente principal de la Interfaz de Chat ---
const ChatInterface = () => {
  // --- ESTADOS (Sin cambios) ---
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "¡Hola! Soy AdaptaChef. Estoy listo para ayudarte a adaptar tus recetas favoritas. Por favor, pega una receta y selecciona una opción.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedRestriction, setSelectedRestriction] = useState("vegano");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Efecto para scroll (Sin cambios)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 2. LÓGICA DE SIMULACIÓN (ACTUALIZADA) ---
  const simulateBotResponse = (userInput) => {
    setIsLoading(true);

    setTimeout(() => {
      let botResponseText = "";
      const lowerCaseInput = userInput.toLowerCase();

      // Buscamos si alguna clave de nuestra base de datos (ej: "lentejas")
      // está incluida en el texto que escribió el usuario.
      const foundKey = Object.keys(mockResponses).find((key) =>
        lowerCaseInput.includes(key)
      );

      if (foundKey) {
        // Si encontramos una receta (ej: "lentejas" o "pastel de choclo")...

        // 1. Obtenemos el set de respuestas para esa receta
        const responsesForRecipe = mockResponses[foundKey];

        // 2. Elegimos la respuesta específica para la restricción seleccionada
        botResponseText = responsesForRecipe[selectedRestriction];
      } else {
        // Si no encontramos ninguna palabra clave de nuestra base de datos...
        botResponseText = `Lo siento, soy un prototipo y solo tengo información detallada para "Lentejas" y "Pastel de Choclo". Pero cuando esté listo, podré adaptar la receta que me acabas de pasar a la opción **${selectedRestriction}** sin problemas.`;
      }

      const newBotMessage = { sender: "bot", text: botResponseText };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsLoading(false);
    }, 1800);
  };

  // --- MANEJADORES DE EVENTOS (Sin cambios) ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || isLoading) return;

    const newUserMessage = { sender: "user", text: inputMessage };
    setMessages([...messages, newUserMessage]);
    simulateBotResponse(inputMessage);
    setInputMessage("");
  };

  // --- RENDERIZADO DEL COMPONENTE (JSX - Sin cambios) ---
  return (
    <div className="w-full max-w-3xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 mx-auto my-10">
      {/* Header del Chat */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-center text-green-800">
          🌿 AdaptaChef IA
        </h3>
        <p className="text-sm text-gray-500 text-center">
          Ingresa una receta y elige tu restricción para comenzar.
        </p>
      </div>

      {/* Área de Mensajes */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-md break-words whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Indicador de "escribiendo..." */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 p-3 rounded-lg flex items-center space-x-2">
              <span>AdaptaChef está pensando</span>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Input del Usuario */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        {/* Botones de Restricción */}
        <div className="mb-3 flex justify-center space-x-2">
          <button
            onClick={() => setSelectedRestriction("vegano")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedRestriction === "vegano"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Vegano
          </button>
          <button
            onClick={() => setSelectedRestriction("sin-gluten")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedRestriction === "sin-gluten"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Sin Gluten
          </button>
          <button
            onClick={() => setSelectedRestriction("sin-lactosa")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedRestriction === "sin-lactosa"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Sin Lactosa
          </button>
        </div>

        {/* Formulario de Envío */}
        <form
          onSubmit={handleSendMessage}
          className="flex items-start space-x-3"
        >
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
            rows="2"
            // Consejo: Si añades más recetas, actualiza el placeholder
            placeholder="Pega aquí la receta de 'Lentejas' o 'Pastel de Choclo'..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition-colors self-stretch flex items-center justify-center disabled:bg-gray-400"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

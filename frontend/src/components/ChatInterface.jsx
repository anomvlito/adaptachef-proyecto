import React, { useState, useEffect, useRef } from "react";
// --- IMPORTAMOS EL SERVICIO DE IA REAL ---
import { consultarChef } from "../services/aiChef.js";
// --- IMPORTAMOS REACT MARKDOWN PARA RENDERIZADO RICO ---
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- Componente principal de la Interfaz de Chat ---
const ChatInterface = () => {
  // --- ESTADOS ---
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "¡Hola! Soy AdaptaChef. Estoy listo para ayudarte a adaptar tus recetas favoritas. Por favor, pega una receta y selecciona una o más restricciones. ¿Necesitas ayuda? Haz clic en el botón de tutorial.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedRestrictions, setSelectedRestrictions] = useState([]); // Array para múltiples restricciones
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false); // Estado para el tutorial
  const [copiedMessageId, setCopiedMessageId] = useState(null); // Para tracking de mensajes copiados
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const messagesEndRef = useRef(null);

  // Efecto para cargar historial desde localStorage al iniciar
  useEffect(() => {
    const savedMessages = localStorage.getItem("adaptachef-messages");
    const savedRestrictions = localStorage.getItem("adaptachef-restrictions");
    const savedDarkMode = localStorage.getItem("adaptachef-darkmode");
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Error al cargar historial:", error);
      }
    }
    
    if (savedRestrictions) {
      try {
        setSelectedRestrictions(JSON.parse(savedRestrictions));
      } catch (error) {
        console.error("Error al cargar restricciones:", error);
      }
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "true");
    }
  }, []);

  // Efecto para aplicar modo oscuro al documento
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("adaptachef-darkmode", darkMode.toString());
  }, [darkMode]);

  // Efecto para guardar mensajes en localStorage cuando cambien
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("adaptachef-messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Efecto para guardar restricciones en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("adaptachef-restrictions", JSON.stringify(selectedRestrictions));
  }, [selectedRestrictions]);

  // Efecto para scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- LÓGICA DE IA REAL (ACTUALIZADA PARA MÚLTIPLES RESTRICCIONES) ---
  const simulateBotResponse = async (userInput) => {
    setIsLoading(true);

    try {
      // Validar que haya al menos una restricción seleccionada
      if (selectedRestrictions.length === 0) {
        const warningMessage = {
          sender: "bot",
          text: "⚠️ Por favor, selecciona al menos una restricción alimentaria antes de enviar tu receta.",
        };
        setMessages((prev) => [...prev, warningMessage]);
        setIsLoading(false);
        return;
      }

      // Llamada real a la IA de Gemini con múltiples restricciones
      const restrictionsText = selectedRestrictions.join(", ");
      const botResponseText = await consultarChef(userInput, restrictionsText);
      
      const newBotMessage = { sender: "bot", text: botResponseText };
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error en la respuesta del bot:", error);
      const errorMessage = {
        sender: "bot",
        text: "⚠️ Lo siento, hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNCIÓN PARA TOGGLE DE RESTRICCIONES MÚLTIPLES ---
  const toggleRestriction = (restriction) => {
    setSelectedRestrictions((prev) => {
      if (prev.includes(restriction)) {
        // Si ya está seleccionada, la quitamos
        return prev.filter((r) => r !== restriction);
      } else {
        // Si no está, la agregamos
        return [...prev, restriction];
      }
    });
  };

  // --- FUNCIÓN PARA SUGERENCIAS DE RECETAS ---
  const handleSuggestion = (suggestion) => {
    setInputMessage(suggestion);
    // Opcional: scroll al textarea
    document.querySelector("textarea")?.focus();
  };

  // --- FUNCIÓN PARA COPIAR MENSAJE AL PORTAPAPELES ---
  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      // Resetear después de 2 segundos
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  // --- FUNCIÓN PARA LIMPIAR CHAT ---
  const clearChat = () => {
    const initialMessage = {
      sender: "bot",
      text: "¡Hola! Soy AdaptaChef. Estoy listo para ayudarte a adaptar tus recetas favoritas. Por favor, pega una receta y selecciona una o más restricciones. ¿Necesitas ayuda? Haz clic en el botón de tutorial.",
    };
    
    setMessages([initialMessage]);
    setInputMessage("");
    setSelectedRestrictions([]);
    
    // Limpiar localStorage
    localStorage.setItem("adaptachef-messages", JSON.stringify([initialMessage]));
    localStorage.setItem("adaptachef-restrictions", JSON.stringify([]));
  };

  // --- FUNCIÓN PARA EXPORTAR A PDF (usando window.print) ---
  const exportToPDF = (messageText) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receta AdaptaChef</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #16a34a; }
          pre { white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>🌿 AdaptaChef - Receta Adaptada</h1>
        <pre>${messageText}</pre>
        <hr>
        <p style="color: #666; font-size: 12px;">Generado por AdaptaChef IA - ${new Date().toLocaleDateString()}</p>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // --- FUNCIÓN PARA COMPARTIR POR WHATSAPP ---
  const shareWhatsApp = (messageText) => {
    const text = encodeURIComponent(`🌿 Receta AdaptaChef:\n\n${messageText}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // --- FUNCIÓN PARA COMPARTIR POR TWITTER ---
  const shareTwitter = (messageText) => {
    const text = encodeURIComponent(`🌿 Receta adaptada con AdaptaChef IA\n\n${messageText.substring(0, 200)}...`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  // --- MANEJADORES DE EVENTOS ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || isLoading) return;

    const newUserMessage = { sender: "user", text: inputMessage };
    setMessages([...messages, newUserMessage]);
    simulateBotResponse(inputMessage);
    setInputMessage("");
  };

  // --- RENDERIZADO DEL COMPONENTE (JSX - MODERNIZADO) ---
  return (
    <div className="w-full max-w-3xl h-[80vh] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col border border-gray-200/50 dark:border-gray-700/50 mx-auto my-10 animate-fade-in-up overflow-hidden">
      {/* Header del Chat con gradiente y botones de acción */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 relative">
        <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-green-800 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          🌿 AdaptaChef IA
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
          Ingresa una receta y elige tus restricciones para comenzar.
        </p>
        
        {/* Botones de acción en el header */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {/* Botón Limpiar Chat */}
          <button
            onClick={clearChat}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group border border-gray-200"
            title="Limpiar chat"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          {/* Botón Modo Oscuro */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group border border-gray-200 dark:border-gray-700"
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Botón de Tutorial */}
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group border border-gray-200"
            title="Ver tutorial"
          >
            <svg className="w-5 h-5 text-green-600 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal de Tutorial */}
      {showTutorial && (
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">📚 Cómo usar AdaptaChef</h4>
              <button
                onClick={() => setShowTutorial(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <p><strong>Selecciona restricciones:</strong> Puedes elegir una o varias (vegano, sin gluten, sin lactosa).</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <p><strong>Pega tu receta:</strong> Copia cualquier receta que quieras adaptar o usa las sugerencias.</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <p><strong>Envía:</strong> La IA adaptará la receta según tus restricciones con ingredientes y pasos detallados.</p>
              </div>
            </div>
            <button
              onClick={() => setShowTutorial(false)}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      )}

      {/* Sugerencias de Recetas */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-gray-800/50 dark:to-gray-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">💡 Prueba con estas recetas:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Pasta Carbonara",
            "Pizza Margarita",
            "Brownie de Chocolate",
            "Tacos al Pastor",
            "Lasaña Boloñesa",
            "Panqueques"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestion(suggestion)}
              className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Área de Mensajes con scroll suave */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/30 to-transparent">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } animate-fade-in-up`}
          >
            <div className={`relative group max-w-md ${msg.sender === "bot" ? "w-full" : ""}`}>
              <div
                className={`p-4 rounded-2xl break-words shadow-md transition-all duration-300 hover:shadow-lg ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                }`}
              >
                {msg.sender === "bot" ? (
                  /* Renderizado con Markdown para mensajes del bot */
                  <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  /* Texto simple para mensajes del usuario */
                  <div className="whitespace-pre-line">{msg.text}</div>
                )}
              </div>
              
              {/* Barra de Acciones (solo para mensajes del bot) */}
              {msg.sender === "bot" && (
                <div className="absolute -bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Botón Copiar */}
                  <button
                    onClick={() => copyToClipboard(msg.text, index)}
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    title="Copiar receta"
                  >
                    {copiedMessageId === index ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>

                  {/* Botón Exportar PDF */}
                  <button
                    onClick={() => exportToPDF(msg.text)}
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    title="Exportar a PDF"
                  >
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {/* Botón WhatsApp */}
                  <button
                    onClick={() => shareWhatsApp(msg.text)}
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    title="Compartir por WhatsApp"
                  >
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>

                  {/* Botón Twitter */}
                  <button
                    onClick={() => shareTwitter(msg.text)}
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    title="Compartir por Twitter"
                  >
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Indicador de "escribiendo..." mejorado */}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white text-gray-500 p-4 rounded-2xl rounded-bl-sm flex items-center space-x-3 shadow-md border border-gray-200">
              <span className="text-sm">AdaptaChef está pensando</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Input del Usuario - Modernizada con Checkboxes */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
        {/* Checkboxes de Restricciones Múltiples */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-3 font-medium">🔖 Selecciona tus restricciones (puedes elegir varias):</p>
          <div className="flex flex-wrap gap-3">
            {/* Checkbox Vegano */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("vegano")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("vegano")}
                onChange={() => toggleRestriction("vegano")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🌱 Vegano</span>
            </label>

            {/* Checkbox Sin Gluten */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("sin gluten")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("sin gluten")}
                onChange={() => toggleRestriction("sin gluten")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🌾 Sin Gluten</span>
            </label>

            {/* Checkbox Sin Lactosa */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("sin lactosa")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("sin lactosa")}
                onChange={() => toggleRestriction("sin lactosa")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🥛 Sin Lactosa</span>
            </label>

            {/* Checkbox Keto */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("keto")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("keto")}
                onChange={() => toggleRestriction("keto")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🥑 Keto</span>
            </label>

            {/* Checkbox Paleo */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("paleo")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("paleo")}
                onChange={() => toggleRestriction("paleo")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🦴 Paleo</span>
            </label>

            {/* Checkbox Bajo en Sodio */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("bajo en sodio")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("bajo en sodio")}
                onChange={() => toggleRestriction("bajo en sodio")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🧂 Bajo en Sodio</span>
            </label>

            {/* Checkbox Diabético */}
            <label className={`flex items-center space-x-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedRestrictions.includes("diabético")
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-green-400"
            }`}>
              <input
                type="checkbox"
                checked={selectedRestrictions.includes("diabético")}
                onChange={() => toggleRestriction("diabético")}
                className="hidden"
              />
              <span className="text-sm font-semibold">🍬 Diabético</span>
            </label>
          </div>
        </div>

        {/* Formulario de Envío mejorado */}
        <form
          onSubmit={handleSendMessage}
          className="flex items-start space-x-3"
        >
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none resize-none transition-all duration-300 bg-white hover:border-gray-400"
            rows="2"
            placeholder="Pega aquí cualquier receta que quieras adaptar..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 self-stretch flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
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
              className="group-hover:translate-x-1 transition-transform duration-300"
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

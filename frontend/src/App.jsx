import React from "react";
import ChatInterface from "./components/ChatInterface"; // Tu componente de chat

function App() {
  // Función de scroll suave (la mantendremos de la Solución 2 anterior)
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* --- SECCIÓN 1: PORTADA (HERO) --- 
        Ahora con diseño dividido (split layout) */}
      <div className="min-h-screen bg-green-50 flex items-center p-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Columna Izquierda: Texto */}
          <main className="flex flex-col items-start text-left">
            <h1 className="text-2xl font-bold text-green-800 mb-2">
              🌿 AdaptaChef
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight">
              Tu Receta, <br />
              Tu Estilo.
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-lg">
              AdaptaChef usa Inteligencia Artificial para transformar cualquier
              receta a tus necesidades alimentarias. Come lo que amas, sin
              preocupaciones.
            </p>
            <a
              href="#chatbot-section"
              onClick={(e) => handleScroll(e, "chatbot-section")}
              className="mt-8 px-8 py-4 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              ¡Prueba el Chatbot!
            </a>
          </main>

          {/* Columna Derecha: Imagen (Placeholder) */}
          <div className="hidden md:flex justify-center items-center">
            {/* Aquí puedes poner una imagen. Por ahora, un placeholder con Tailwind */}
            <div className="w-full h-96 bg-green-200 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-green-700 text-lg">
                (Aquí va una bonita foto de comida)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 2: CÓMO FUNCIONA --- 
        Esta es la nueva sección que acabamos de añadir */}
      <div id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Adapta tus recetas en 3 simples pasos.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <span className="text-4xl">📋</span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">
                1. Pega tu Receta
              </h3>
              <p className="text-gray-600">
                Copia y pega la receta que quieras adaptar en nuestro chat.
              </p>
            </div>
            {/* Tarjeta 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <span className="text-4xl">✅</span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">
                2. Elige tu Restricción
              </h3>
              <p className="text-gray-600">
                Selecciona si la quieres vegana, sin gluten, sin lactosa, etc.
              </p>
            </div>
            {/* Tarjeta 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <span className="text-4xl">✨</span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">
                3. Recibe la Magia
              </h3>
              <p className="text-gray-600">
                Nuestra IA analizará la receta y te dará la versión adaptada al
                instante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 3: CHATBOT --- */}
      <div
        id="chatbot-section"
        className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4"
      >
        <ChatInterface />
      </div>

      {/* --- SECCIÓN 4: FOOTER --- 
        Un pie de página simple */}
      <footer className="bg-gray-800 text-gray-300 p-8 text-center">
        <p>🌿 AdaptaChef</p>
        <p className="text-sm mt-2">
          © 2025 - Un proyecto para el curso IIC3113.
        </p>
      </footer>
    </>
  );
}

export default App;

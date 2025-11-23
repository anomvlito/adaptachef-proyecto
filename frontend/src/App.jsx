import React from "react";
import ChatInterface from "./components/ChatInterface";

function App() {
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
      {/* HERO SECTION */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center p-6 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-200 dark:bg-green-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200 dark:bg-emerald-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-200 dark:bg-teal-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
          <main className="flex flex-col items-start text-left space-y-6 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2 animate-fade-in-up animation-delay-200">
              🌿 AdaptaChef
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-900 via-emerald-800 to-teal-900 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight animate-fade-in-up animation-delay-400">
              Tu Receta, <br />
              Tu Estilo.
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg animate-fade-in-up animation-delay-600">
              AdaptaChef usa Inteligencia Artificial para transformar cualquier
              receta a tus necesidades alimentarias. Come lo que amas, sin
              preocupaciones.
            </p>
            <a
              href="#chatbot-section"
              onClick={(e) => handleScroll(e, "chatbot-section")}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animation-delay-800 group"
            >
              <span className="flex items-center gap-2">
                ¡Prueba el Chatbot!
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </main>

          <div className="hidden md:flex justify-center items-center animate-fade-in-up animation-delay-1000">
            <div className="w-full h-96 bg-gradient-to-br from-green-400/20 to-emerald-500/20 dark:from-green-600/20 dark:to-emerald-600/20 backdrop-blur-lg rounded-3xl shadow-2xl flex items-center justify-center border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-green-700 dark:text-green-300 text-lg font-medium z-10">
                🍽️ Recetas Adaptadas con IA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4 animate-fade-in-up">
            ¿Cómo Funciona?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Adaptar tus recetas favoritas es tan fácil como 1, 2, 3.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-400 relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500"></div>
              <span className="text-5xl mb-4 block transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">📋</span>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2 relative z-10">
                1. Pega tu Receta o Menciónala
              </h3>
              <p className="text-gray-600 dark:text-gray-400 relative z-10">
                Copia y pega la receta que quieras adaptar, o simplemente menciona el nombre del plato.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-600 relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500"></div>
              <span className="text-5xl mb-4 block transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">✅</span>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2 relative z-10">
                2. Elige tu Restricción
              </h3>
              <p className="text-gray-600 dark:text-gray-400 relative z-10">
                Selecciona si la quieres vegana, sin gluten, sin lactosa, etc.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-800 relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500"></div>
              <span className="text-5xl mb-4 block transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">✨</span>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2 relative z-10">
                3. Recibe la Magia
              </h3>
              <p className="text-gray-600 dark:text-gray-400 relative z-10">
                Nuestra IA analizará la receta y te dará la versión adaptada al instante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <div className="w-full bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-700 dark:to-orange-600 py-4 text-center">
        <p className="text-white font-bold text-lg tracking-wider">
          🛒 Patrocinado por Jumbo - Encuentra todos los ingredientes que necesitas
        </p>
      </div>

      {/* CHATBOT */}
      <div
        id="chatbot-section"
        className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4"
      >
        <ChatInterface />
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2025 AdaptaChef - Proyecto IIC3113. Hecho con ❤️ y mucha ☕
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

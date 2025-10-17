# 🌿 AdaptaChef IA — Prototipo funcional

Este repositorio contiene el prototipo frontend del proyecto "AdaptaChef", un chatbot impulsado por IA diseñado para adaptar recetas de cocina a diversas restricciones alimentarias. Este prototipo fue desarrollado como parte de la Entrega 2 del curso IIC3113.

## 🎯 Estado actual del proyecto

El proyecto está en una fase de **prototipo funcional (mockup) de alta fidelidad**. El frontend está 100% operativo y simula la experiencia de usuario final de manera controlada.

Características principales:

- **Landing Page profesional**
- **Scroll suave** (clase `scroll-smooth`) desde la landing hasta el chatbot
- **Interfaz de chat completa**, construida con React y Tailwind CSS
- **Simulación de IA (mockup)** usando una "base de datos falsa" (`mockDatabase.js`) para responder a recetas predefinidas
- **Lógica de restricciones**: el usuario puede seleccionar restricciones (Vegano, Sin Gluten, Sin Lactosa) y las respuestas se adaptan
- **Demo controlada** con respuestas detalladas para **12 recetas diferentes**

---

## 🚀 Cómo ejecutar este prototipo

Requisitos: Node.js instalado.

1. Clonar el repositorio

```bash
# Con SSH (recomendado)
git clone git@github.com:anomvlito/adaptachef-proyecto.git

# O con HTTPS
git clone https://github.com/anomvlito/adaptachef-proyecto.git
```

2. Entrar a la carpeta del frontend

```bash
cd adaptachef-proyecto/frontend
```

3. Instalar dependencias

```bash
npm install
```

4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

5. Probar el Mockup

Abre tu navegador y visita http://localhost:5173/ para ver la aplicación funcionando.

Cómo simular una conversación:
El prototipo está diseñado para simular respuestas de IA basadas en palabras clave. El flujo de prueba es:

Selecciona una Restricción: Haz clic en "Vegano", "Sin Gluten" o "Sin Lactosa".

Escribe un Prompt: Escribe una frase que contenga el nombre de alguna de las recetas simuladas.

Recibe la Respuesta: El bot te dará una respuesta detallada y adaptada según la restricción que elegiste.

Recetas Disponibles en la Demo:
Puedes probar escribiendo frases que incluyan cualquiera de estas 12 recetas:

Lentejas

Pastel de Choclo

Cazuela

Empanadas

Lasaña

Porotos Granados

Charquicán

Pizza

Panqueques

Kuchen

Tacos

Sopaipillas

Ejemplo de prueba:

Selecciona: Vegano

Escribe: Quiero hacer una lasaña rica

Resultado: Recibirás la adaptación vegana para la lasaña.

¿Qué pasa si escribo otra cosa? Si escribes una receta que no está en la lista (ej: "Sushi" o "Risotto"), el bot te dará una respuesta genérica indicando que es un prototipo.

¿Cómo agregar más recetas a la simulación? ¡Es fácil! Simplemente abre el archivo frontend/src/data/mockDatabase.js y añade una nueva entrada de receta siguiendo el formato existente.

6. 🚀 Futuras Features (Próximos Pasos)
Este prototipo sienta las bases para las siguientes funcionalidades clave:

Conexión con una IA Real: Reemplazar la base de datos falsa (mockDatabase.js) por una conexión real a un modelo de lenguaje (como la API de Gemini o ChatGPT) para permitir conversaciones dinámicas y adaptar cualquier receta, no solo las simuladas.

Gestión de Usuarios: Implementar un sistema de registro y login para que los usuarios puedan guardar su historial de conversaciones y recetas adaptadas.

Reconocimiento de Recetas: Permitir que el usuario suba una foto de una receta o pegue una URL, y que la IA la reconozca y procese automáticamente.

Adaptación Múltiple: Soportar la selección de múltiples restricciones a la vez (ej. "vegano" y "sin gluten" al mismo tiempo).

Perfil Nutricional: Añadir la capacidad de calcular y mostrar el perfil nutricional (calorías, proteínas, etc.) de la receta adaptada.
Abre tu navegador en: http://localhost:5173/

## 🛠️ Stack de tecnologías

- Vite — entorno de desarrollo frontend ultrarrápido  
- React — biblioteca para la interfaz de usuario  
- Tailwind CSS — framework de utilidades CSS  
- JavaScript (ES6+) — lógica de la aplicación

---


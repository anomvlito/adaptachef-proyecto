# 🌿 AdaptaChef IA — Prototipo funcional

Repositorio del prototipo frontend de "AdaptaChef": un chatbot que adapta recetas a restricciones alimentarias. Desarrollo realizado como parte de la Entrega 2 del curso IIC3113.

---

## 📌 Contenido rápido
- [Estado actual](#estado-actual)
- [Cómo ejecutar](#cómo-ejecutar)
- [Cómo probar el mockup](#cómo-probar-el-mockup)
- [Recetas disponibles](#recetas-disponibles)
- [Agregar más recetas](#agregar-más-recetas)
- [Futuras features](#futuras-features)
- [Stack tecnológico](#stack-tecnológico)

---

## 🔍 Estado actual

Prototipo funcional (mockup) de alta fidelidad. El frontend está 100% operativo y simula la experiencia final mediante una base de datos ficticia.

Características principales:
- Landing Page profesional
- Scroll suave (clase `scroll-smooth`)
- Interfaz de chat completa con React y Tailwind CSS
- Simulación de IA mediante `frontend/src/data/mockDatabase.js`
- Lógica de restricciones: Vegano / Sin Gluten / Sin Lactosa
- Demo controlada con adaptaciones para 12 recetas

---

## 🚀 Cómo ejecutar

Requisitos: Node.js

1. Clonar el repositorio (SSH recomendado)
```bash
git clone git@github.com:anomvlito/adaptachef-proyecto.git
# o (HTTPS)
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

4. Iniciar servidor de desarrollo
```bash
npm run dev
```

5. Abrir en el navegador
http://localhost:5173/

---

## 🧪 Cómo probar el mockup

Flujo de prueba:
1. Selecciona una restricción: haz clic en "Vegano", "Sin Gluten" o "Sin Lactosa".
2. Escribe un prompt que incluya el nombre de alguna receta simulada.
3. Recibe la respuesta adaptada del bot (generada desde la base de datos ficticia).

Ejemplo:
- Selecciona: **Vegano**
- Escribe: `Quiero hacer una lasaña rica`
- Resultado: recibirás la adaptación vegana para la lasaña.

Si escribes una receta no incluida (ej.: "Sushi" o "Risotto"), el bot devolverá una respuesta genérica indicando que es un prototipo.

---

## 🍽️ Recetas disponibles en la demo

- Lentejas
- Pastel de Choclo
- Cazuela
- Empanadas
- Lasaña
- Porotos Granados
- Charquicán
- Pizza
- Panqueques
- Kuchen
- Tacos
- Sopaipillas

---

## 🛠️ Cómo agregar más recetas

Editar el archivo:
`frontend/src/data/mockDatabase.js`

Añade una nueva entrada de receta siguiendo el formato existente y reinicia el servidor si es necesario.

---

## 🔭 Futuras features (próximos pasos)

- Conectar con una IA real (ej., API de Gemini / ChatGPT) para respuestas dinámicas.
- Gestión de usuarios (registro/login) y guardado de historial.
- Reconocimiento de recetas por foto o URL.
- Soporte para múltiples restricciones simultáneas.
- Perfil nutricional (calorías, proteínas, etc.) de la receta adaptada.

---

## 🧩 Stack tecnológico

- Vite — entorno frontend rápido  
- React — interfaz de usuario  
- Tailwind CSS — utilidades CSS  
- JavaScript (ES6+)

---

Abre tu navegador en: http://localhost:5173/

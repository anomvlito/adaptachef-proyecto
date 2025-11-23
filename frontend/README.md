# 🌿 AdaptaChef IA

> **Transforma cualquier receta a tus necesidades alimentarias con Inteligencia Artificial**

AdaptaChef es una aplicación web moderna que utiliza IA generativa (Gemini 2.0) para adaptar recetas de cocina según restricciones alimentarias específicas.

![React](https://img.shields.io/badge/React-18.2-61dafb) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8) ![Gemini](https://img.shields.io/badge/IA-Gemini%202.0-blue)

---

## 💡 Motivación

### El Problema

Millones de personas enfrentan restricciones alimentarias diarias por razones de salud, éticas o religiosas. Adaptar recetas manualmente es:
- ⏰ **Consume tiempo** - Investigar sustitutos adecuados
- 🤔 **Requiere conocimiento** - Saber qué ingredientes reemplazar
- 😰 **Genera incertidumbre** - ¿Funcionará la sustitución?

### La Solución

**AdaptaChef** automatiza este proceso usando Inteligencia Artificial:
- ✅ **Instantáneo** - Respuestas en segundos
- ✅ **Inteligente** - Sustituciones basadas en ciencia culinaria
- ✅ **Confiable** - Explicaciones detalladas de cada cambio
- ✅ **Accesible** - Interfaz simple y moderna

---

## ✨ Características

### 🤖 Inteligencia Artificial
- **Gemini 2.0 Flash Lite** - Modelo de última generación
- **Prompts optimizados** - Chef experto en adaptaciones
- **Respuestas en Markdown** - Formato rico y estructurado
- **Contexto múltiple** - Combina varias restricciones

### 🎨 Diseño Moderno 2025
- **Animaciones suaves** - Fade-in, fade-in-up, blob
- **Glassmorphism** - Efectos de vidrio esmerilado
- **Micro-interacciones** - Hover effects dinámicos
- **Modo Oscuro** - Toggle con transición suave de 0.3s
- **Scrollbar personalizado** - Gradiente verde

### 🔧 Funcionalidades

#### Restricciones Múltiples (7 opciones)
- 🌱 Vegano
- 🌾 Sin Gluten
- 🥛 Sin Lactosa
- 🥑 Keto
- 🦴 Paleo
- 🧂 Bajo en Sodio
- 🍬 Diabético

#### Sugerencias Inteligentes
6 recetas populares clickeables para empezar rápido

#### Tutorial Interactivo
Modal paso a paso que explica cómo usar la app

#### Historial Persistente
- Guarda automáticamente en localStorage
- Restaura conversaciones al recargar
- Mantiene restricciones seleccionadas

#### Exportar y Compartir
Cada respuesta incluye:
- 📋 Copiar al portapapeles
- 📄 Exportar a PDF
- 💬 Compartir por WhatsApp
- 🐦 Compartir por Twitter

---

## 🛠 Tecnologías

```json
{
  "framework": "React 18.2",
  "build-tool": "Vite 4.4",
  "styling": "TailwindCSS 3.3",
  "markdown": "react-markdown + remark-gfm",
  "ai-model": "Gemini 2.0 Flash Lite",
  "storage": "localStorage"
}
```

---

## 📦 Instalación

### Prerrequisitos
- Node.js 16+
- npm o yarn
- API Key de Google Gemini ([Obtener aquí](https://aistudio.google.com/app/apikey))

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/adaptachef-proyecto.git
cd adaptachef-proyecto/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la carpeta `frontend`:
```env
GOOGLE_API_KEY=tu_api_key_aqui
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en navegador**
```
http://localhost:5173
```

---

## 🚀 Uso

### Flujo Básico

1. **Selecciona restricciones** - Una o varias
2. **Ingresa receta** - Pega o menciona el plato
3. **Envía** - La IA procesará tu solicitud
4. **Recibe adaptación** - Receta completa con explicaciones

### Ejemplo

**Entrada:**
```
Restricciones: Vegano + Sin Lactosa
Receta: Pizza Margarita
```

**Salida:**
```markdown
## INGREDIENTES:
- Masa sin lácteos
- Salsa de tomate
- Queso vegano
- Albahaca fresca

## PASOS:
1. Prepara la masa...
2. Extiende la salsa...
[etc.]

## SUSTITUCIONES:
- Queso mozzarella → Queso vegano
- Mantequilla → Aceite de oliva
```

---

## 🎨 Modo Oscuro

El modo oscuro está completamente implementado con:
- ✅ Toggle en el header (ícono sol/luna)
- ✅ Transición suave de 0.3s en todos los elementos
- ✅ Persistencia en localStorage
- ✅ Responsive en toda la aplicación
- ✅ Colores adaptados para ambos temas

**Activar:** Haz clic en el ícono de sol/luna en la esquina superior derecha del chat.

---

## 🏗 Arquitectura

```
frontend/
├── src/
│   ├── components/
│   │   └── ChatInterface.jsx    # Chat principal
│   ├── services/
│   │   └── aiChef.js             # Servicio Gemini
│   ├── App.jsx                   # Landing page
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Animaciones CSS
├── .env                          # Variables de entorno
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Configuración

### Variables de Entorno

```env
GOOGLE_API_KEY=tu_api_key_de_gemini
```

### Vite Config

```javascript
export default defineConfig({
  plugins: [react()],
  envPrefix: 'GOOGLE_', // Permite leer GOOGLE_API_KEY
});
```

### Tailwind Config

```javascript
export default {
  darkMode: 'class', // Modo oscuro con clase
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## 📊 Funcionalidades Implementadas

### ✅ Completadas
1. ✅ Diseño moderno 2025
2. ✅ Animaciones personalizadas
3. ✅ Gemini AI integrado
4. ✅ Restricciones múltiples (7 opciones)
5. ✅ Sugerencias de recetas
6. ✅ Tutorial interactivo
7. ✅ Renderizado Markdown
8. ✅ Botón copiar
9. ✅ Limpiar chat
10. ✅ Historial persistente
11. ✅ Exportar a PDF
12. ✅ Compartir WhatsApp/Twitter
13. ✅ Modo oscuro completo

---

## 🧪 Testing

### Pruebas Recomendadas

1. **Funcionalidad Básica**
   - [ ] Seleccionar múltiples restricciones
   - [ ] Enviar receta
   - [ ] Recibir respuesta formateada

2. **Persistencia**
   - [ ] Recargar página
   - [ ] Verificar historial restaurado

3. **Exportar/Compartir**
   - [ ] Copiar mensaje
   - [ ] Exportar a PDF
   - [ ] Compartir por WhatsApp/Twitter

4. **Modo Oscuro**
   - [ ] Toggle dark mode
   - [ ] Verificar transición suave
   - [ ] Verificar persistencia

---

## 🚧 Roadmap Futuro

### Versión 2.0
- [ ] Backend con Node.js
- [ ] Base de datos
- [ ] Autenticación de usuarios
- [ ] Favoritos y colecciones
- [ ] Generación de imágenes con IA

---

## 📄 Licencia

Proyecto creado para el curso **IIC3113** - Uso educativo.

---

## 👨‍💻 Autor

**Proyecto AdaptaChef**
- Curso: IIC3113
- Año: 2025
- Tecnología: React + Gemini IA

---

## 🙏 Agradecimientos

- **Google Gemini** - Por la API de IA generativa
- **Tailwind CSS** - Por el framework de estilos
- **React** - Por la librería de UI
- **Vite** - Por el build tool ultrarrápido

---

<div align="center">

**🌿 AdaptaChef - Tu Receta, Tu Estilo**

Hecho con ❤️ y mucha ☕

</div>

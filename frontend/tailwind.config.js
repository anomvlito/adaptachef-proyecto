/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"; // Importa el tema por defecto

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Habilitar modo oscuro con clase
  theme: {
    extend: {
      // Aquí le decimos a Tailwind que use 'Inter' como fuente principal
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // También puedes añadir los colores de tu marca
      colors: {
        green: {
          ...defaultTheme.colors.green, // Mantiene los verdes de Tailwind
          50: "#f0fdf4", // Un verde muy pálido para fondos
          600: "#16a34a", // Tu verde principal
          800: "#166534", // Un verde oscuro para texto
          900: "#14532d", // El más oscuro
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

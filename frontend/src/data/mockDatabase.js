// src/data/mockDatabase.js
// Esta es tu "base de datos" falsa.
// ¡Ahora con 12 recetas para una demo robusta!
// El código en ChatInterface.jsx buscará estas palabras clave.

export const mockResponses = {
  // --- Caso 1: Lentejas ---
  lentejas: {
    vegano:
      "¡Claro! Para hacer lentejas veganas, el proceso es simple:\n\n1.  **Omite** el chorizo o cualquier carne.\n2.  **Añade** un sofrito generoso de pimentón, cebolla y zanahoria para potenciar el sabor.\n\n¡Un toque de merkén al final queda increíble!",
    "sin-gluten":
      "Las lentejas son naturalmente sin gluten. \nTu única precaución debe ser:\n\n* Asegúrate de que el **caldo** que uses (si es comprado) esté certificado como 'sin gluten' y no contenga trazas.\n* Evita acompañarlas con pan tradicional.",
    "sin-lactosa":
      "¡Perfecto! La receta de lentejas tradicional no suele llevar lácteos, así que es naturalmente apta. ¡Disfrútalas!",
  },

  // --- Caso 2: Pastel de Choclo ---
  "pastel de choclo": {
    vegano:
      "Para un pastel de choclo vegano, necesitas dos reemplazos clave:\n\n1.  **Para el pino:** Usa champiñones, berenjenas o soya texturizada en lugar de la carne.\n2.  **Para la pastelera:** Usa leche vegetal (almendras o soya) y reemplaza la mantequilla por aceite de coco o margarina vegana. \n\n¡Queda delicioso!",
    "sin-gluten":
      "¡Buena elección! El pastel de choclo es casi siempre sin gluten.\nLa clave es la pastelera: si usas harina para espesar, asegúrate de que sea **harina de maíz** (maicena) o de arroz, y no de trigo.",
    "sin-lactosa":
      "Para adaptar el pastel de choclo sin lactosa, el único cambio es en la pastelera:\n\n* Reemplaza la leche de vaca por **leche sin lactosa** o una leche vegetal (la de coco le da un toque cremoso).\n* Usa margarina o aceite en vez de mantequilla.",
  },

  // --- Caso 3: Cazuela ---
  cazuela: {
    vegano:
      "Para una cazuela vegana contundente:\n\n1.  Usa un buen **caldo de verduras** como base.\n2.  Reemplaza la carne por trozos grandes de **champiñón ostra** o **soya texturizada** hidratada.\n3.  ¡No olvides el zapallo, choclo, porotos verdes y papa!",
    "sin-gluten":
      "La cazuela es una receta naturalmente sin gluten. Los ingredientes (carne, papas, zapallo, choclo) son todos aptos. \nSolo evita añadir fideos de trigo; si quieres, usa fideos de arroz.",
    "sin-lactosa":
      "¡Excelentes noticias! La cazuela tradicional chilena no lleva ningún ingrediente con lactosa. Es 100% apta para tu restricción.",
  },

  // --- Caso 4: Empanadas de Pino ---
  empanadas: {
    vegano:
      "¡Un clásico! Para empanadas de pino veganas:\n\n1.  **Masa:** Usa una masa 100% vegetal (muchas masas de supermercado lo son, revisa que no tengan manteca animal).\n2.  **Pino:** Reemplaza la carne por **proteína de soya texturizada** fina, bien aliñada con comino y ají de color.",
    "sin-gluten":
      "El desafío aquí es la masa.\n\n* Necesitas usar una **premezcla de harina sin gluten** para hacer la masa de empanadas.\n* El pino es naturalmente sin gluten (carne, cebolla, huevo, aceituna).",
    "sin-lactosa":
      "La mayoría de las recetas de pino no llevan lácteos. \nEl único punto a revisar es la **masa**: asegúrate de que esté hecha con manteca vegetal o aceite, y no con mantequilla.",
  },

  // --- Caso 5: Lasaña Boloñesa ---
  lasaña: {
    vegano:
      "Adaptar una lasaña es un proyecto entretenido:\n\n1.  **Salsa Boloñesa:** Hazla con **lentejas** o **soya texturizada**.\n2.  **Salsa Blanca (Bechamel):** Prepara una bechamel con leche vegetal (soya o avena) y margarina vegana.\n3.  **Queso:** Usa un queso vegano rallado para gratinar.",
    "sin-gluten":
      "¡Fácil! El único cambio es la pasta:\n\n* Usa **láminas de lasaña sin gluten** (las hay de maíz o arroz).\n* Asegúrate de que tus salsas no estén espesadas con harina de trigo (usa maicena si es necesario).",
    "sin-lactosa":
      "El desafío está en los lácteos:\n\n1.  **Salsa Blanca (Bechamel):** Hazla con **leche sin lactosa** y **margarina**.\n2.  **Queso:** Usa **queso sin lactosa** o queso mantecoso (que es naturalmente muy bajo en lactosa).",
  },

  // --- Caso 6: Porotos Granados ---
  "porotos granados": {
    vegano:
      "Los porotos granados son veganos casi por defecto.\nLa única precaución es **no usar longaniza** o tocino al freír la cebolla. Usa aceite de oliva y mucho ají de color.",
    "sin-gluten":
      "¡Receta perfecta! Los porotos granados (con porotos, zapallo, choclo) son **100% libres de gluten** por naturaleza.",
    "sin-lactosa":
      "¡También 100% apta! Esta receta tradicional chilena no usa ningún producto lácteo.",
  },

  // --- Caso 7: Charquicán ---
  charquicán: {
    vegano:
      "Para un charquicán vegano, reemplaza la carne molida por:\n\n* **Soya texturizada** (hidratada y sofrita).\n* **Champiñones** picados finamente.\n* O incluso **lentejas** ya cocidas.\n\nSofríe bien con comino y ají de color para mantener el sabor.",
    "sin-gluten":
      "El charquicán es naturalmente sin gluten. Todos sus ingredientes (papas, zapallo, carne, choclo, arvejas) son aptos.",
    "sin-lactosa":
      "¡Buenas noticias! El charquicán tradicional no lleva lácteos. Es una preparación 100% segura para ti.",
  },

  // --- Caso 8: Pizza ---
  pizza: {
    vegano:
      "¡Claro! La clave es el queso.\n\n1.  **Queso:** Usa un **queso vegano** (hecho de papa, coco o castañas de cajú).\n2.  **Toppings:** Evita los embutidos y cámbialos por champiñones, pimentón, aceitunas y rúcula fresca al final.",
    "sin-gluten":
      "El problema es la masa.\nTienes dos opciones:\n\n1.  Comprar una **premezcla de harina sin gluten** para pizza.\n2.  Comprar una **base de pizza lista** sin gluten (suelen ser de coliflor, arroz o maíz).",
    "sin-lactosa":
      "Muy simple. El único cambio es el queso.\nUsa **queso sin lactosa** (tipo mozzarella o gauda) o un queso vegano. ¡El resto de los ingredientes (masa, salsa, toppings) son aptos!",
  },

  // --- Caso 9: Panqueques ---
  panqueques: {
    vegano:
      "Para panqueques veganos (y quedan geniales):\n\n1.  **Leche:** Usa cualquier leche vegetal (soya, almendras, avena).\n2.  **Huevo:** Reemplaza cada huevo por un **'huevo de linaza'** (1 cda de linaza molida + 3 cdas de agua, reposada 5 min).",
    "sin-gluten":
      "¡Muy fácil! Simplemente reemplaza la harina de trigo por una **premezcla de harina sin gluten** (la que venden para repostería funciona perfecto).",
    "sin-lactosa":
      "El cambio más simple de todos: solo tienes que reemplazar la leche de vaca por **leche sin lactosa**. ¡Nada más!",
  },

  // --- Caso 10: Kuchen de Manzana ---
  kuchen: {
    vegano:
      "Para un kuchen vegano:\n\n1.  **Masa:** Usa **margarina 100% vegetal** en lugar de mantequilla.\n2.  **Relleno (Migas/Streusel):** Igualmente, usa margarina vegetal.\n3.  **Huevo (si la masa lleva):** Reemplázalo por puré de manzana o un huevo de linaza.",
    "sin-gluten":
      "El desafío es la masa y las migas (streusel).\nDebes usar una **mezcla de harinas sin gluten** para repostería. El relleno de manzana es naturalmente apto.",
    "sin-lactosa":
      "¡Sencillo! Simplemente reemplaza la **mantequilla** (tanto de la masa como del streusel) por **margarina vegetal** o una mantequilla sin lactosa.",
  },

  // --- Caso 11: Tacos ---
  tacos: {
    vegano:
      "Para el relleno, en vez de carne, usa:\n\n* **Lentejas o porotos negros** bien sazonados.\n* **Soya texturizada** con sazón para tacos.\n* **Champiñones** salteados con pimentón.\n\nEvita el queso y la crema ácida (o usa versiones veganas).",
    "sin-gluten":
      "¡Elige bien la tortilla!\n\n* Usa **tortillas 100% de maíz** (las tortillas de trigo tienen gluten).\n* Revisa que el **sazonador** para tacos no contenga trigo como espesante.",
    "sin-lactosa":
      "La carne y las verduras están bien. \nSimplemente **omite el queso y la crema ácida**, o reemplázalos por sus versiones **sin lactosa**.",
  },

  // --- Caso 12: Sopaipillas ---
  sopaipillas: {
    vegano:
      "La mayoría de las recetas de sopaipillas pasadas son veganas (zapallo, harina, manteca vegetal).\n\n* Solo asegúrate de que usen **manteca vegetal** y no manteca animal (de cerdo).",
    "sin-gluten":
      "Esta es difícil. Necesitas hacer la masa desde cero usando una **premezcla de harina sin gluten** apta para panadería. Es un desafío, ¡pero se puede!",
    "sin-lactosa":
      "¡100% aptas! Las sopaipillas tradicionales (tanto pasadas como secas) no llevan **ningún lácteo**.",
  },
};

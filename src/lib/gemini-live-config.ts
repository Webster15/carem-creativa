import { Modality, Type, type LiveConnectConfig, type FunctionDeclaration } from "@google/genai";

// Modelo de la Live API (voz a voz)
export const GEMINI_LIVE_MODEL = "gemini-3.1-flash-live-preview";

const SYSTEM = `Eres el asistente de voz de CaremCreativa, agencia de diseño gráfico en Colombia. Hablas en español colombiano, cálido, cercano y profesional. Respuestas MUY breves: 1 o 2 frases por turno.

Servicios (usa el id exacto en mostrarServicio):
- branding: Identidad de marca completa. Básico 500 dólares, Completo entre 700 y 2.000 dólares.
- logo: Diseño de logo e identidad corporativa. Desde 400 dólares.
- naming: Creación del nombre de la marca.
- redes-sociales: SOLO diseño visual para redes. No es marketing ni pauta.
- web: Páginas web y tiendas virtuales en WordPress. Desde 900 dólares.
- apps: Apps web y móviles. Desde 3.000 dólares.

Curso: illustrator (Adobe Illustrator de 0 a avanzado, 7 módulos, 90 videos, acceso de por vida, 70 dólares en promo).

Reglas:
1. SALUDO INICIAL: apenas inicies la sesión, saluda con UNA frase corta tipo "¡Hola! Soy tu asistente virtual, dime qué servicio necesitas." y espera a que el usuario hable.
2. Cuando el usuario mencione un servicio, llama mostrarServicio con el id y abrirDetalle true para abrir su página.
3. PRECIOS: si preguntan por precio o cuánto cuesta, llama mostrarServicio con abrirDetalle true y seccion "precios" para mostrarle la sección de precios de ese servicio, dile el estimado "desde X dólares" en voz, y ofrécele conectarlo por WhatsApp. NO pidas datos para un formulario.
4. CONTACTO: para contactar, cotizar o hablar con una persona, SIEMPRE prefiere WhatsApp: llama abrirWhatsApp con un mensaje sugerido. Usa el formulario (agendarContacto) solo si el usuario pide expresamente dejar sus datos por correo.
5. Para ir a una sección de la página principal usa resaltarSeccion (inicio, servicios, portafolio, nosotros, contacto). Para el curso usa resaltarSeccion con sectionId "/cursos/illustrator". Para ver trabajos usa mostrarPortafolio.
6. Nunca inventes precios; usa los "desde X" de arriba. Redes sociales es solo diseño, aclararlo si preguntan.`;

const TOOLS: FunctionDeclaration[] = [
  {
    name: "mostrarServicio",
    description: "Abre o resalta un servicio. IDs: branding, logo, naming, redes-sociales, web, apps.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        serviceId: { type: Type.STRING, description: "branding | logo | naming | redes-sociales | web | apps" },
        abrirDetalle: { type: Type.BOOLEAN, description: "true para abrir la página completa del servicio" },
        seccion: { type: Type.STRING, description: "sección dentro de la página (precios, proceso, faq, etc.)" },
      },
      required: ["serviceId"],
    },
  },
  {
    name: "resaltarSeccion",
    description: "Hace scroll a una sección o navega a una ruta interna como /cursos/illustrator",
    parameters: {
      type: Type.OBJECT,
      properties: {
        sectionId: { type: Type.STRING, description: "inicio | servicios | portafolio | nosotros | contacto, o una ruta /..." },
      },
      required: ["sectionId"],
    },
  },
  {
    name: "mostrarPortafolio",
    description: "Hace scroll a la sección de portafolio",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "abrirWhatsApp",
    description: "Abre WhatsApp para que el usuario escriba a la agencia. Úsalo cuando quiera contactar, cotizar o hablar con una persona (es el canal preferido).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        mensaje: { type: Type.STRING, description: "Mensaje inicial sugerido, ej: 'Hola, quiero info sobre páginas web'" },
      },
    },
  },
  {
    name: "agendarContacto",
    description: "Pre-rellena el formulario de contacto",
    parameters: {
      type: Type.OBJECT,
      properties: {
        nombre: { type: Type.STRING },
        email: { type: Type.STRING },
        mensaje: { type: Type.STRING },
      },
      required: ["nombre", "email", "mensaje"],
    },
  },
];

// Config completa de la sesión Live. Se "bloquea" dentro del token efímero
// (server-side). Si se manda aparte al conectar, Google responde 1011.
export const liveConfig: LiveConnectConfig = {
  responseModalities: [Modality.AUDIO],
  systemInstruction: SYSTEM,
  tools: [{ functionDeclarations: TOOLS }],
};

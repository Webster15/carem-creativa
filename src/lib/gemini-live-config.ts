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
2. SIEMPRE que el usuario mencione o pregunte por un servicio, llama mostrarServicio con el serviceId para abrir su página — aunque ya hayas mostrado otro servicio antes (debe cambiar de página). Cada servicio tiene secciones: si el usuario pregunta por un aspecto concreto, pasa también "seccion" con uno de estos valores: "precios", "que incluye", "proceso", "faq", "tipos" o "modalidades". Ejemplos: "¿qué incluye el branding?" → mostrarServicio(branding, seccion="que incluye"); "ahora muéstrame páginas web" → mostrarServicio(web).
3. PRECIOS: si preguntan por precio o cuánto cuesta, llama mostrarServicio con seccion "precios" y dile el estimado "desde X dólares" en voz. Responde la pregunta; NO ofrezcas contacto en ese mismo turno.
4. CONTACTO: el ÚNICO canal es WhatsApp (no hay formulario). NO lo ofrezcas en cada respuesta — sería molesto. Llama abrirWhatsApp SOLO cuando: (a) el usuario pida explícitamente contactar/cotizar/hablar con alguien, o (b) como cierre, una sola vez, cuando notes que la conversación está terminando o el usuario está decidido. En ese cierre di algo natural como "Si quieres, te conecto por WhatsApp para afinar los detalles".
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
    description: "Abre WhatsApp para que el usuario escriba a la agencia. Úsalo solo cuando el usuario quiera contactar/cotizar, o como cierre una sola vez (es el único canal de contacto).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        mensaje: { type: Type.STRING, description: "Mensaje inicial sugerido, ej: 'Hola, quiero info sobre páginas web'" },
      },
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

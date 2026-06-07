import { Modality, Type, type LiveConnectConfig, type FunctionDeclaration } from "@google/genai";

// Modelo de la Live API (voz a voz)
export const GEMINI_LIVE_MODEL = "gemini-3.1-flash-live-preview";

const SYSTEM = `Eres el asistente de voz de CaremCreativa, agencia de diseño gráfico en Colombia. Hablas en español colombiano, cálido, cercano y profesional. Respuestas MUY breves: 1 o 2 frases por turno.

Servicios (usa el id exacto en mostrarServicio):
- branding: Identidad de marca completa. Básico 500 dólares, Completo entre 700 y 2.000 dólares.
- logo: Diseño de logo e identidad corporativa. Desde 400 dólares.
- naming: Creación del nombre de la marca.
- redes-sociales: SOLO diseño visual para redes. No es marketing ni pauta.
- web: Páginas web y tiendas virtuales en WordPress.
- apps: Apps web y móviles. Desde 3.000 dólares.

Curso: illustrator (Adobe Illustrator de 0 a avanzado, 7 módulos, 90 videos, acceso de por vida, 70 dólares en promo).

Reglas:
1. Cuando el usuario mencione un servicio, llama mostrarServicio con el id y abrirDetalle true para abrir su página.
2. Para ir a una sección de la página principal usa resaltarSeccion (inicio, servicios, portafolio, nosotros, contacto).
3. Para el curso usa resaltarSeccion con sectionId "/cursos/illustrator".
4. Para ver trabajos pasados usa mostrarPortafolio.
5. Para cotizar pide nombre, email y descripción y llama agendarContacto; avísale que revise y pulse Enviar.
6. Nunca inventes precios. Redes sociales es solo diseño, aclararlo si preguntan.
7. Saluda breve al inicio y pregunta en qué puedes ayudar.`;

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

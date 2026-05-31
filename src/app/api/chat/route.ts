import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, type FunctionDeclaration } from "@google/generative-ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM = `Eres el asistente de texto de CaremCreativa, agencia de diseño gráfico en Colombia. Respondes en español colombiano, de forma amigable y concisa (máximo 2 frases salvo que pidan detalle).

Servicios disponibles (usa el id exacto en mostrarServicio):
- branding: Identidad de marca completa. Básico $500 USD, Completo $700–$2,000 USD.
- logo: Diseño de logo e identidad corporativa. Desde $400 USD.
- naming: Creación del nombre de marca.
- redes-sociales: Solo diseño visual para redes sociales. NO es marketing ni pauta publicitaria.
- web: Páginas web y tiendas virtuales.
- apps: Apps web y móviles. MVP desde $3,000 USD.

Cursos disponibles:
- illustrator: Curso Adobe Illustrator de 0 a avanzado. 7 módulos, 90 videos, acceso de por vida. $70 USD (promo, precio normal $140 USD).

Reglas:
1. Si el usuario menciona un servicio → llama mostrarServicio con el id correcto (branding|logo|naming|redes-sociales|web|apps) y abrirDetalle: true.
2. Para navegar a una sección → resaltarSeccion con el id (inicio|servicios|portafolio|nosotros|contacto).
3. Para mostrar el portafolio → mostrarPortafolio.
4. Si pregunta por el curso de Illustrator → resaltarSeccion con sectionId "/cursos/illustrator".
5. Si el usuario quiere contactar o cotizar → pide nombre, email y descripción, luego llama agendarContacto.
6. Nunca inventes precios. Si no sabes, di "se cotiza según el alcance del proyecto".
7. Redes sociales = SOLO diseño visual, no community management ni publicidad.
8. Sé breve y amable. Máximo 2 frases salvo que pidan detalle.`;

const functionDeclarations: FunctionDeclaration[] = [
  {
    name: "mostrarServicio",
    description: "Navega o resalta la tarjeta de un servicio. IDs válidos: branding, logo, naming, redes-sociales, web, apps.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        serviceId: {
          type: SchemaType.STRING,
          description: "ID del servicio: branding | logo | naming | redes-sociales | web | apps",
        },
        abrirDetalle: {
          type: SchemaType.BOOLEAN,
          description: "true para navegar a la página completa del servicio",
        },
        seccion: {
          type: SchemaType.STRING,
          description: "Sección específica dentro de la página (ej: precios, proceso, faq)",
        },
      },
      required: ["serviceId"],
    },
  },
  {
    name: "resaltarSeccion",
    description: "Hace scroll a una sección o navega a una URL interna",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        sectionId: {
          type: SchemaType.STRING,
          description: "ID de sección (inicio|servicios|portafolio|nosotros|contacto) o ruta como /cursos/illustrator",
        },
      },
      required: ["sectionId"],
    },
  },
  {
    name: "mostrarPortafolio",
    description: "Hace scroll a la sección de portafolio",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
    },
  },
  {
    name: "agendarContacto",
    description: "Pre-rellena el formulario de contacto con los datos del usuario",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        nombre: { type: SchemaType.STRING, description: "Nombre del cliente" },
        email: { type: SchemaType.STRING, description: "Email del cliente" },
        mensaje: { type: SchemaType.STRING, description: "Descripción del proyecto o mensaje" },
      },
      required: ["nombre", "email", "mensaje"],
    },
  },
];

type ChatMessage = { role: string; content: string };

export async function POST(req: Request) {
  let messages: ChatMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Sin mensajes." }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM,
      tools: [{ functionDeclarations }],
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = result.response;

    const functionCalls = response.functionCalls();
    const toolCall = functionCalls?.length
      ? { name: functionCalls[0].name, params: functionCalls[0].args }
      : null;

    let text = "";
    try { text = response.text(); } catch { /* function call with no text */ }

    return NextResponse.json({
      message: text || (toolCall ? "¡Claro! Te llevo ahí ahora." : "Entendido."),
      toolCall,
    });
  } catch (err) {
    console.error("[chat] Gemini error:", err);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}

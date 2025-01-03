import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
}

const messages = new Hono<{ Bindings: Bindings }>();

// Fetch messages for a conversation (with pagination)
messages.get("/:conversationId", async (c) => {
  const conversationId = parseInt(c.req.param("conversationId"));
  const currentUserId = parseInt(c.req.query("userId") || "0");
  const page = parseInt(c.req.query("page") || "1");
  const limit = 20;

  if (!conversationId) {
    return c.json({ error: "Conversation ID is required" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const messages = await prisma.message.findMany({
      where: { conversationId },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { sentAt: "asc" },
      include: {
        Sender: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    const enrichedMessages = messages.map(msg => ({
      ...msg,
      type: msg.Sender.id === currentUserId ? 'you' : 'other'
    }));

    return c.json(enrichedMessages);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

// Send a new message
messages.post("/send", async (c) => {
  const { conversationId, senderId, content, attachmentUrl } = await c.req.json();

  if (!conversationId || !senderId || !content) {
    return c.json({ error: "Conversation ID, sender ID, and content are required" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Create a new message
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        attachmentUrl,
      },
      include: {
        Sender: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    return c.json(message, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

export default messages;

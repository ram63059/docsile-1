import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
}

const conversations = new Hono<{ Bindings: Bindings }>();

// Fetch user's conversations (with pagination)
conversations.get("/:userId", async (c) => {
  const userIdParam = c.req.param("userId");
  if (!userIdParam) {
    return c.json({ error: "User ID is required" }, 400);
  }

  const userId = parseInt(userIdParam);
  const page = parseInt(c.req.query("page") || "1");
  const limit = 10;

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Fetch conversations where the user is either user1 or user2
    const userConversations = await prisma.conversation.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { updatedAt: "desc" },
      include: {
        User1: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        User2: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        messages: {
          select: {
            content: true,
            sentAt: true,
          },
          orderBy: { sentAt: 'desc' },

          take: 1
        },

      }
    });

    return c.json(userConversations);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch conversations" }, 500);
  }
});

// Create a new conversation between two users
conversations.post("/:userId", async (c) => {
  const { userId1, userId2 } = await c.req.json();

  if (!userId1 || !userId2) {
    return c.json({ error: "Both user IDs are required" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Check if the conversation already exists between the two users
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { user1Id: userId1, user2Id: userId2 },
          { user1Id: userId2, user2Id: userId1 },
        ],
      },
    });

    if (existingConversation) {
      return c.json(existingConversation);
    }

    // Create a new conversation if not exists
    const conversation = await prisma.conversation.create({
      data: {
        user1Id: userId1,
        user2Id: userId2,
      },
    });

    return c.json(conversation, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create conversation" }, 500);
  }
});

export default conversations;

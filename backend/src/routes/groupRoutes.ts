import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
};

const groups = new Hono<{ Bindings: Bindings }>();

// Fetch all groups for a user
groups.get("/:userId", async (c) => {
  const userId = parseInt(c.req.param("userId"));

  if (!userId) {
    return c.json({ error: "User ID is required" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userGroups = await prisma.group.findMany({
      where: {
        groupMemberships: {
          some: { userId: userId },
        },
      },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
    });

    return c.json(userGroups);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch groups" }, 500);
  }
});

// Create a new group
groups.post("/create", async (c) => {
  const { name, creatorId, memberIds } = await c.req.json();

  if (!name || !creatorId || !memberIds || !Array.isArray(memberIds)) {
    return c.json({ error: "Invalid input data" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const group = await prisma.group.create({
      data: {
        name,
        creatorId,
        groupMemberships: {
          create: memberIds.map((id) => ({ userId: id })),
        },
      },
    });

    return c.json(group, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create group" }, 500);
  }
});

// Fetch group messages
groups.get("/:groupId/messages", async (c) => {
  const groupId = parseInt(c.req.param("groupId"));
  const page = parseInt(c.req.query("page") || "1");
  const limit = 20;
  
  if (!groupId) {
    return c.json({ error: "Group ID is required" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const messages = await prisma.groupMessage.findMany({
        where: { groupId },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: "asc" },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    return c.json(messages);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

// Send a new group message
groups.post("/:groupId/messages", async (c) => {
  const groupId = parseInt(c.req.param("groupId"));
  const { senderId, content } = await c.req.json();

  if (!groupId || !senderId || !content) {
    return c.json({ error: "Invalid input data" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const message = await prisma.groupMessage.create({
      data: {
        groupId,
        senderId,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Return the complete message with sender info
    const messageWithSender = {
      ...message,
      sender: message.sender,
      Sender: message.sender // Include both formats for compatibility
    };

    return c.json(messageWithSender, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

// Add Member to a Group
groups.post("/:groupId/add-member", async (c: { req: { param: (key: string) => string; json: () => Promise<any> }; env: { DATABASE_URL: string }; json: (data: any, status?: number) => Response }) => {
  const groupId = parseInt(c.req.param("groupId") || "0");
  const { memberId } = await c.req.json();

  if (!groupId || !memberId) {
    return c.json({ error: "Group ID and Member ID are required" }, 400);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Check if the group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return c.json({ error: "Group not found" }, 404);
    }

    // Add the member to the group
    const groupMember = await prisma.groupMember.create({
      data: {
        groupId: groupId,
        userId: memberId,
      },
    });

    return c.json({
      success: true,
      message: `User with ID ${memberId} added to group ${groupId}`,
      groupMember,
    });
  } catch (error) {
    console.error("Error adding member to group:", error);
    return c.json({ error: "Failed to add member to group" }, 500);
  }
});

export default groups;

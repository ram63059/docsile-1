import { Hono } from "hono"
import { z } from "zod";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { setCookie } from "hono/cookie";
import { cors } from "hono/cors";




const auth = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
}>();

auth.use('/*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length', 'X-Requested-With',"Content-Type", "Authorization"],
  maxAge: 600,
}));

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 6 characters long"),
  category: z.enum(["doctor", "student", "organisation"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
});



auth.post("/signup", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validation = signupSchema.safeParse(body);
  if (!validation.success) {
    return c.json(
      {
        error: "Validation failed",
        details: validation.error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      },
      400
    );
  }

  const { email, password, category } = validation.data;

  try {
    // Determine which table to use based on category
    const user =
      category === "organisation"
        ? await prisma.organisations.create({
            data: { email, password, category },
          })
        : await prisma.user.create({ data: { email, password, category } });

    const token = await sign(
      {
        payload: {
          id: user.id,
          email: user.email,
        },
      },
      c.env.JWT_SECRET

    );

    setCookie(c, "authtoken", token, {
      httpOnly: true,
      secure: true, // Ensures cookie is only sent over HTTPS
      sameSite: "strict", // Protects against CSRF
      path: "/", // Cookie is available across all paths
      maxAge: 7 * 24 * 60 * 60, // Cookie expires in 7 days (in seconds)
    });
  

    return c.json({
      token,
      id: user.id,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      c.status(409);
      return c.json("A user with this email already exists");
    }

    c.status(500);
    return c.json("Internal Server Error");
  }
});



auth.post("/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, provider } = body;

    if (!email) {
      c.status(400);
      return c.json({ message: "Email is required" });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existinguser = await prisma.user.findUnique({
      where: { email },
    });

    if (existinguser) {
      const token = sign(
        { id: existinguser.id, email: existinguser.email },
        c.env.JWT_SECRET
      );
      return c.json({ exists: true, token });
    }

    if (provider === "google") {
      return c.json({
        exists: false,
        message: "User not found. Please complete registration.",
      });
    }

    c.status(404);
    return c.json({ exists: false, message: "User not found" });
  } catch (error) {
    console.error("Error in /signin:", error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});


export default auth;



import { verify } from "hono/jwt";
import { Context } from "hono";

export async function authMiddleware(c: Context, next: Function) {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = verify(token, c.env.JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (err) {
    return c.json({ error: "Invalid token" }, 401);
  }
}

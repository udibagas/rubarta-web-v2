import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, "session");

  if (!sessionId) {
    return null;
  }

  // Find session and user
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    // Session expired or not found
    if (session) {
      await prisma.session.delete({ where: { id: sessionId } });
    }
    deleteCookie(event, "session");
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  };
});

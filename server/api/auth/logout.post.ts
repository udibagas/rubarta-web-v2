import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, "session");

  if (!sessionId) {
    throw createError({
      statusCode: 401,
      message: "Not authenticated",
    });
  }

  // Delete session
  await prisma.session
    .delete({
      where: { id: sessionId },
    })
    .catch(() => {
      // Session might already be deleted or expired
    });

  // Clear cookie
  deleteCookie(event, "session");

  return { success: true };
});

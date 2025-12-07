export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server
  if (process.server) return;

  // Skip if not accessing admin routes
  if (!to.path.startsWith("/admin")) return;

  // Check authentication
  const { data: user } = await useFetch("/api/auth/me");

  if (!user.value) {
    // Not authenticated, redirect to login
    return navigateTo("/login");
  }
});

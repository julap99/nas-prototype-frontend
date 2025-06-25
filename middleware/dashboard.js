export default defineNuxtRouteMiddleware(async (to, from) => {
  // Validate every request to every page
  const { auth } = useApi();
  const validateUser = await auth.validate();

  // If user is not logged in, redirect to logout page
  if (validateUser.data.statusCode === 401) return true;

  return navigateTo("/dashboard");
});

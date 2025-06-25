export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $swal } = useNuxtApp();

  if (process.client) {
    // Validate every request to every page
    const { auth } = useApi();
    const validateUser = await auth.validate();

    // If user is not logged in, redirect to logout page
    if (validateUser.data.statusCode === 401) {
      $swal
        .fire({
          title: "Session Expired",
          text: "Your session has expired. Please login again.",
          icon: "warning",
          confirmButtonText: "OK",
        })
        .then(() => {
          return window.location.replace("/logout");
        });
    }

    return true;
  }
});

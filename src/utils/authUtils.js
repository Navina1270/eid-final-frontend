export const clearAuthStorage = (router) => {
  localStorage.clear();
  sessionStorage.clear()
  if (router) {
    router.push("/login");
  }
};
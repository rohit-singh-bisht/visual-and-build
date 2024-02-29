export const useAuth = () => {
  const expirationDate = localStorage.getItem("expirationDate");
  const user = localStorage.getItem("user");

  if (user && expirationDate && new Date(expirationDate) > new Date()) {
    return true;
  } else {
    return false;
  }
};

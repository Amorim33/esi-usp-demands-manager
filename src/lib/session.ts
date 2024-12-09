/** Saves user to local storage. */
export const saveSession = (token: string) => {
  localStorage.setItem("user", token);
};

/** Removes user from local storage and redirects to user edit page. */
export const clearSession = () => {
  localStorage.removeItem("user");
  window.location.replace("/");
};

/** Returns user from local storage. */
export const getSession = () => localStorage.getItem("user");

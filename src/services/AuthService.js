import api from "../utils/authentication";

export const login = (body) => {
  return api.user
    .login(body)
    .then((tokens) => {
      const access_token = tokens.data.access_token;
      const refresh_token = tokens.data.refresh_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      return tokens;
    })
    .catch((err) => {
      console.log("Invalid credentials: ", err);
      logout();
      return err;
    });
};
export const logout = () => {
  localStorage.clear();
};

export const getCurrentUser = async () => {
  return await api.user
    .profile()
    .then((userData) => {
      return userData.data;
    })
    .catch((err) => {
      window.alert("Session Expired!", err);
      return false;
    });
};

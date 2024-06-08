import axios from "../setup/axios";

const registerNewUser = (email, username, password, fullname) => {
  return axios.post("/api/v1/register", {
    email,
    username,
    password,
    fullname,
  });
};

const handleUserLogin = (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const handleChangePassword = (id, oldPassword, newPassword) => {
  return axios.put("/api/v1/change-password", { id, oldPassword, newPassword });
};

const getUserAccount = () => {
  return axios.get("/api/v1/account");
};
const logoutUser = () => {
  return axios.post("/api/v1/logout");
};
export {
  registerNewUser,
  handleUserLogin,
  getUserAccount,
  logoutUser,
  handleChangePassword,
};

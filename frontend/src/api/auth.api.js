import { AuthInstance } from "./apiClient";

export const AuthApi = {
  login: async ({ email, password }) => {
    const res = await AuthInstance.post("login/", { email, password });
    return res.data;
  },
  signup: async (data) => {
    const res = await AuthInstance.post("registration/", data);
    return res.data;
  },
  setProfile: async (data = {}) => {
    const res = await AuthInstance.post("profile/", data);
    return res.data;
  },
  getProfile: async () => {
    const res = await AuthInstance.get("profile/");
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await AuthInstance.patch("profile/", data);
    return res.data;
  },
};

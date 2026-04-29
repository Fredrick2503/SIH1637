import axios from "axios";
import { useUserStore } from "../store/AuthStore";

export const ResourceInstance = axios.create({
  baseURL: "/api/v1/marketspace/",
  withCredentials: true,
});

ResourceInstance.interceptors.request.use(
  (config) => {
    const tokens = useUserStore.getState()?.tokens;
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ResourceInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("/api/v1/auth/token/refresh/", {
          refresh: useUserStore.getState()?.tokens.refresh,
        });
        const newtokens = res.data;
        useUserStore.getState().setTokens(newtokens.access, newtokens.refresh);
        originalRequest.headers.Authorization = `Bearer ${newtokens.access}`;
        return ResourceInstance(originalRequest);
      } catch (err) {
        useUserStore.getState().setlogout();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const BidsInstance = axios.create({
  baseURL: "/api/v1/bids/",
  withCredentials: true,
});

BidsInstance.interceptors.request.use(
  (config) => {
    const tokens = useUserStore.getState()?.tokens;
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

BidsInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("/api/v1/auth/token/refresh/", {
          refresh: useUserStore.getState()?.tokens.refresh,
        });
        const newtokens = res.data;
        useUserStore.getState().setTokens(newtokens.access, newtokens.refresh);
        originalRequest.headers.Authorization = `Bearer ${newtokens.access}`;
        return BidsInstance(originalRequest);
      } catch (err) {
        useUserStore.getState().setlogout();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const OrdersInstance = axios.create({
  baseURL: "/api/v1/orders/",
  withCredentials: true,
});

OrdersInstance.interceptors.request.use(
  (config) => {
    const tokens = useUserStore.getState()?.tokens;
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthInstance = axios.create({
  baseURL: "/api/v1/auth/",
  withCredentials: true,
});

AuthInstance.interceptors.request.use(
  (config) => {
    const tokens = useUserStore.getState()?.tokens;
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

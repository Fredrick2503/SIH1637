import { ResourceInstance } from "./apiClient";

export const MarketplaceApi = {
  getListings: async () => {
    try {
      const res = await ResourceInstance.get("listings/");
      return res.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  getMyListings: async () => {
    try {
      const res = await ResourceInstance.get("listings/mylistings/");
      return res.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  getTransactions: async () => {
    try {
      const res = await ResourceInstance.get("transactions/");
      return res.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  getProduces: async () => {
    try {
      const res = await ResourceInstance.get("produces/");
      return res.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  createListing: async (data) => {
    try {
      const res = await ResourceInstance.post("listings/", data);
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getListingDetail: async (id) => {
    try {
      const res = await ResourceInstance.get(`listings/${id}/`);
      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

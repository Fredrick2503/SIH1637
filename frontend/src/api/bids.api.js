import { BidsInstance } from "./apiClient";

export const BidsApi = {
  getBids: async () => {
    try {
      const res = await BidsInstance.get("mybid/");
      return res.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  placeBid: async (bidData) => {
    try {
      const res = await BidsInstance.post("mybid/", bidData);
      return res.data;
    } catch (e) {
      console.error("Error placing bid:", e.response?.data || e);
      throw e;
    }
  },
  getBidDetail: async (id) => {
    try {
      const res = await BidsInstance.get(`mybid/${id}/`);
      return res.data;
    } catch (e) {
      console.error("Error fetching bid detail:", e);
      return null;
    }
  },
  updateBidStatus: async (id, status) => {
    try {
      const res = await BidsInstance.patch(`mybid/${id}/`, { status });
      return res.data;
    } catch (e) {
      console.error("Error updating bid status:", e);
      throw e;
    }
  },
};

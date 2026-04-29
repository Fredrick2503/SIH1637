import { OrdersInstance } from "./apiClient";

export const OrdersApi = {
  getTransactions: async () => {
    try {
      const res = await OrdersInstance.get("transactions/");
      return res.data;
    } catch (e) {
      console.error("Error fetching transactions:", e);
      return [];
    }
  },
  processPayment: async (bidId) => {
    try {
      const res = await OrdersInstance.post("pay/", { bid_id: bidId });
      return res.data;
    } catch (e) {
      console.error("Error processing payment:", e.response?.data || e);
      throw e;
    }
  },
};

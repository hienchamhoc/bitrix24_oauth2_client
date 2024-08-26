import { Address } from "@/app/types/address";
import { serverAxiosClient } from "../axiosClient";

export const addressApi = {
  deleteAddress: async (userId: number, address: Address) => {
    const response = await serverAxiosClient.post(
      "/api/address/delete?userId=" + userId,
      address
    );
    return response.data;
  },
};

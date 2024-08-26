import { serverAxiosClient } from "../axiosClient";

export const bankdetailApi = {
  deleteBankdetail: async (userId: number, id: number) => {
    const response = await serverAxiosClient.post(
      "/api/bankdetail/delete?userId=" + userId + "&id=" + id
    );
    return response.data;
  },
};

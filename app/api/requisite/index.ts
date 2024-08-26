import { serverAxiosClient } from "../axiosClient";

export const requisiteApi = {
  deleteRequisite: async (userId: number, id: number) => {
    const response = await serverAxiosClient.post(
      "/api/requisite/delete?userId=" + userId + "&id=" + id
    );
    return response.data;
  },
};

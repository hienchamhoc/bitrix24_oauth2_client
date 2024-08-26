import { toast } from "react-hot-toast";
import { serverAxiosClient } from "../axiosClient";

const oauthApi = {
  getAccessToken: async (redirect_uri: string | null, code: string) => {
    const response = await serverAxiosClient.get(
      `/api/oauth/token/` +
        `?grant_type=authorization_code` +
        (redirect_uri ? "&client_secret=" + redirect_uri : "") +
        "&code=" +
        code +
        "&scope=crm"
    );
    if (response.status == 200) {
      localStorage.setItem("userId", response.data.userId);
    }

    return response.data.userId;
  },
  renewToken: async (userId: string) => {
    const response = await serverAxiosClient.get(
      `/api/oauth/token/renew?userId=` + userId
    );

    return response.data;
  },
};

export default oauthApi;

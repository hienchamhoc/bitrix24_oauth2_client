import { toast } from "react-hot-toast";
import { serverAxiosClient } from "../axiosClient";

const installApi = {
  testConnect: async () => {
    const response = await serverAxiosClient.get(``);
    console.log();

    return response;
  },
};

export default installApi;

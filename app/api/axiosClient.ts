import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"; // { InternalAxiosRequestConfig }

const bitrix24AxiosClient = axios.create({
  baseURL: process.env.BITRIX24_DOMAIN,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

var serverAxiosClient = axios.create({
  // baseURL: process.env.HANDLE_DOMAIN,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

function changeServerUrl(serverUrl: string) {
  serverAxiosClient = axios.create({
    baseURL: serverUrl,
    // withCredentials: true,
    headers: {
      "content-type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  serverAxiosClient.interceptors.response.use(
    async (response: AxiosResponse) => {
      return response;
    },
    async function (err: AxiosError) {
      console.log((err.response as any).data.error);

      if (
        (err.response as any).data.error == "invalid_token" ||
        (err.response as any).data.error == "expired_token"
      ) {
        const userId = await localStorage.getItem("userId");

        if (userId) {
          try {
            const res = await serverAxiosClient.get(
              "/api/oauth/token/renew?userId=" + userId
            );
            if (res.status == 200) {
              const reRes = await serverAxiosClient.request(
                err.response!.config
              );

              return reRes;
            } else {
              return Promise.reject(err);
            }
          } catch (error) {
            return Promise.reject(err);
          }
        } else {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(err);
      }
    }
  );
}

export { bitrix24AxiosClient, serverAxiosClient, changeServerUrl };

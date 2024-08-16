import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios' // { InternalAxiosRequestConfig }

const bitrix24AxiosClient = axios.create({
  baseURL: process.env.BITRIX24_DOMAIN,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})


var serverAxiosClient = axios.create({
  // baseURL: process.env.HANDLE_DOMAIN,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

function changeServerUrl(serverUrl:string) {
  serverAxiosClient = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
    headers: {
      'content-type': 'application/json'
    }
  })
}


export {bitrix24AxiosClient, serverAxiosClient, changeServerUrl}

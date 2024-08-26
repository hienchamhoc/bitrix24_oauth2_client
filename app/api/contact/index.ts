import { Contact } from "@/app/types/contact";
import { serverAxiosClient } from "../axiosClient";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const contactApi = {
  getListContact: async (userId: number) => {
    try {
      const response = await serverAxiosClient.get(
        "/api/contact?userId=" + userId
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error(error.message);
      }
    }
  },
  getContact: async (userId: number, id: string) => {
    try {
      const response = await serverAxiosClient.get(
        "/api/contact/get?userId=" + userId + "&id=" + id
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error(error.message);
      }
    }
  },
  addContact: async (userId: number, contact: Contact) => {
    try {
      const response = await serverAxiosClient.post(
        "/api/contact/add?userId=" + userId,
        contact
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error(error.message);
      }
    }
  },
  updateContact: async (userId: number, contact: Contact) => {
    try {
      const response = await serverAxiosClient.put(
        "/api/contact/update?userId=" + userId + "&id=" + contact.ID,
        contact
      );

      return response.data;
    } catch (error: any) {
      if (error.response.data.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error(error.message);
      }
    }
  },
  deleteContact: async (userId: number, id: number) => {
    try {
      const response = await serverAxiosClient.post(
        "/api/contact/delete?userId=" + userId + "&id=" + id
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error(error.message);
      }
    }
  },
};
export { contactApi };

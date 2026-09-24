//@ts-nocheck
import { statusHandle } from "../../utils/statusHandle";
import { apiConnection } from "@/app/api";
import axios from "axios";


export const handleUser = {
  isUser: async () => {
    try {
      const res = await apiConnection.get(
        "/user/data/me",
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  fetchUser: async () => {
    try {
      const res = await apiConnection.get(
        "/user/data/account",
      );
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  updateUser: async (data) => {
    try {
      const res = await apiConnection.put(
        "/user/data/update",
        data
      );
      statusHandle.statusInfo(res.status)
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  removeUser: async () => {
    try {
      const res = await apiConnection.delete(
        "/user/data/permanently/delete/account",
      );
      statusHandle.statusInfo(res.status)
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  getDefaultAvatars: async () => {
    try {
      const res = await apiConnection.get(
        "/user/data/fetch/all/default/avatars",
      );
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  ChangeDefaultAvatar: async (data) => {
    try{
      const res = await apiConnection.put(
        "/user/data/save/changed/default/avatar",
        { avatar: data }
      );
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  customAvatar: async (formData) => {
    try{
      const res = await apiConnection.post("/user/data/save/custom/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  },
  getCommunities: async () => {
    try {
      const res = await apiConnection.get(
        "/user/data/communities",
      );
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  }
};

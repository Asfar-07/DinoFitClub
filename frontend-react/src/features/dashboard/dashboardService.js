// @ts-nocheck
import { apiConnection } from "@/app/api";
import { statusHandle } from "../../utils/statusHandle";
import { DashboardDataForm } from "@/utils/databaseForm";
import { data } from "react-router-dom";

export const handleDashboard = {
  createDashboard: async (formData) => {
    try {
      const res = await apiConnection.post(
        "/community/dashboard/create",
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getDashboardData:async (dash_id) => {
    try {
      const res = await apiConnection.get(
        `/dashboard/give/data/client?dashId=${dash_id}`,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};


export const handleStudent ={
  getStudentData:async(dash_id)=>{
     try {
      const res = await apiConnection.get(
        `/dashboard/student/data?dashID=${dash_id}`,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  createStudentData:async(newdata,dash_id)=>{
    newdata.dashboardId=dash_id;
    newdata.progressStatus="starting"
    try {
      const res = await apiConnection.post(
        "/dashboard/student/inset",
        newdata,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  updateStudentData:async(updateData)=>{
     try {
      const res = await apiConnection.put(
        "/dashboard/student/update",
        updateData,
      );

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  deleteStudentData:async(student_id,dash_id)=>{
     try {
      const res = await apiConnection.delete(
        `/dashboard/student/remove/${dash_id}/${student_id}`,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
}
export const handlePayment={
  collectPayment:async(dash_id)=>{
     try {
      const res = await apiConnection.get(
        `/dashboard/fetch/payment/record?dashID=${dash_id}`,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  savePayment:async(data)=>{
    try {
      const res = await apiConnection.post(
        "/dashboard/save/payment/record",
        data,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

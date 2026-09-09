import AxiosInstance from "./axios-instance";

export const wizards = {
  getWizards: (params?: Record<string, string>) =>
    AxiosInstance.testBaseAxios
      .get("/Wizards", { params })
      .then((res) => res?.data),
};

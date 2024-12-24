import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;

export const Api = {
  // -------------- login apis ------------------//
  login: async (mobile) => {
    try {
      const response = await axios.post(`${base_url}/api/user/login`, {
        phone: mobile,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async ({ page = 1, limit = 10, search }) => {
    try {
      const response = await axios.get(`${base_url}/api/user/getAllUsers`, {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAboutUs: async () => {
    try {
      const response = await axios.get(`${base_url}/api/app/getAboutUs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPrivacyPolicy: async () => {
    try {
      const response = await axios.get(`${base_url}/api/app/getPrivacyPolicy`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTermsAndCondition: async () => {
    try {
      const response = await axios.get(`${base_url}/api/app/getTermsAndConditions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addAboutUs: async (content) => {
    try {
      const response = await axios.post(`${base_url}/api/app/addAboutUs`, {
        content,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addPrivacyPolicy: async (content) => {
    try {
      const response = await axios.post(`${base_url}/api/app/addPrivacyPolicy`, {
        content,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addTermsAndCondition: async (content) => {
    try {
      const response = await axios.post(`${base_url}/api/app/addTermsConditions`, {
        content,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

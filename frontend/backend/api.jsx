import axios from "axios";

class API {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this._initializeInterceptors();
  }

  setToken(token) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  _initializeInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        // TOKEN

        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }



        const method = config.method?.toUpperCase();
        const url = `${config.baseURL}${config.url}`;

        console.log(
          `%c[API REQUEST] ${method} ${url}`,
          "color: #1976d2; font-weight: bold;"
        );

        if (config.params) {
          console.log("➡ Params:", config.params);
        }

        if (config.data) {
          console.log("➡ Payload:", config.data);
        }

        return config;
      },
      (error) => {
        console.error("[API REQUEST ERROR]", error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(
          `%c[API RESPONSE] ${response.status} ${response.config.url}`,
          "color: #2e7d32; font-weight: bold;"
        );
        return response;
      },
      (error) => {
        const status = error.response?.status;
        const url = error.config?.url;

        console.error(
          `%c[API RESPONSE ERROR] ${status || "NO STATUS"} ${url}`,
          "color: #d32f2f; font-weight: bold;"
        );

        return Promise.reject(error);
      }
    );
  }


  register(data) {
    return this.client.post("/api/auth/register", data);
  }

  login(data) {
    return this.client.post("/api/auth/login", data);
  }

  masterslist(tablename) {
    return this.client.get(`/api/masters/list/${tablename}`);
  }

  masteradd(data) {
    return this.client.post(`/api/masters/add`, data);
  }

  masteredit(data) {
    return this.client.put(`/api/masters/edit`, data);
  }

  masterdelete(data) {
    return this.client.delete(`/api/masters/delete`, data);
  }

  savedonor(data) {
    return this.client.post(`/api/donors/donor/add`, data);
  }
  requestblood(data) {
    return this.client.post(`/api/donors/blood_requests`, data);
  }
  getDonors(params = {}) {
    return this.client.get("/api/donors/getdonor", { params });
  }
  getStatsAbout() {
    return this.client.get("/api/stats/about");
  }
  getStatsAdmin() {
    return this.client.get("/api/stats/admin");
  }
  getAllDonors() {
    return this.client.get("/api/donors/all");
  }
  updateDonorStatus(id, status) {
    return this.client.put(`/api/donors/status/${id}`, { status });
  }

  deleteDonor(id) {
    return this.client.delete(`/api/donors/${id}`);
  }
  getAllRequests() {
  return this.client.get("/api/requests/all");
}

updateRequestStatus(id, status) {
  return this.client.put(`/api/requests/status/${id}`, { status });
}
verifyFirebaseOTP(data) {
  return this.client.post("/api/auth/verify", data);
}


}

export default new API();

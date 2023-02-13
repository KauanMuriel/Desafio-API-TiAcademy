import http from "../http-common";

class ServiceDataService {
    list() {
        return http.get("/Service/GetAllServices");
    }
}

export default new ServiceDataService();
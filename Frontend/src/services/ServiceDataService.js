import http from "../http-common";

class ServiceDataService {
    list() {
        return http.get("/Service/GetAllServices");
    }

    register(service) {
        return http.post("/Service", service);
    }

    getById(id) {
        return http.get(`/Service/${id}`);
    }

    update(id, service) {
        return http.put(`/Service/${id}`, service);
    }

    async delete(id) {
        return await http.delete(`/Service/${id}`);
    }
}

export default new ServiceDataService();
import http from "../http-common";

class OrderDataService {
    list() {
        return http.get("/Order/GetAllOrders");
    }

    getById(id) {
        return http.get(`/Order/${id}`);
    }

    register(order) {
        return http.post("/Order", order);
    }

    async delete() {
        return await http.delete(`/Order/${id}`);
    }
}

export default new OrderDataService();
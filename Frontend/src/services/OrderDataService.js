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

    async delete(id) {
        return await http.delete(`/Order/${id}`);
    }

    getBySeller(id) {
        return http.get("/Order/GetOrdersSeller/" + id);
    }

    getByCustomer(id) {
        return http.get("/Order/GetOrdersCustomer/" + id);
    }
}

export default new OrderDataService();
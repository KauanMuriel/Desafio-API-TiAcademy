import http from '../http-common';

class ItemDataService {
    list(id) {
        return http.get(`/OrderItem/${id}`);
    }

    delete(orderId, serviceId) {
        return http.delete("/OrderItem", orderId, serviceId);
    }

    register(item) {
        return http.post("/OrderItem", item);
    }
}

export default new ItemDataService();
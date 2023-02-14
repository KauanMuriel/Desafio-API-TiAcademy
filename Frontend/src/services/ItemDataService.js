import http from '../http-common';

class ItemDataService {
    list(id) {
        return http.get(`/OrderItem/${id}`);
    }
}

export default new ItemDataService();
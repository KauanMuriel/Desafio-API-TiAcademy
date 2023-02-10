import http from "../http-common";

class CustomerDataService {
    list() {
        return http.get('/Customer/GetAllCustomers');
    }

    register(customer) {
        return http.post('/Customer', customer);
    }

    update(id, customer) {
        return http.put(`/Customer/${id}`, customer);
    }

    getById(id) {
        return http.get(`/Customer/${id}`);
    }
}

export default new CustomerDataService();
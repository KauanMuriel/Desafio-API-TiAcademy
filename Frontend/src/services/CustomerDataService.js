import http from "../http-common";

class CustomerDataService {
    list() {
        return http.get('/Customer/GetAllCustomers');
    }

    register(seller) {
        return http.post('/Customer', seller);
    }
}

export default new CustomerDataService();
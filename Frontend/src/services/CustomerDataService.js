import http from "../http-common";

class CustomerDataService {
    list() {
        return http.get('/Customer/GetAllCustomers');
    }
}

export default new CustomerDataService();
import http from "../http-common";

class OrderDataService {
    list() {
        return http.get("/Order/GetAllOrders")
    }
}

export default new OrderDataService();
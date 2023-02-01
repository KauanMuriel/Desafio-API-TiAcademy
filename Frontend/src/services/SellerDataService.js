import http from "../http-common";

class SellerDataService {
    list() {
        return http.get('/Seller/GetAllSellers');
    }

    register(seller) {
        return http.post('/Seller', seller);
    }

    update(id, seller) {
        return http.put(`/Seller/${id}`, seller);
    }

    getById(id) {
        return http.get(`/Seller/${id}`);
    }

    async delete(id) {
        return await http.delete(`Seller/${id}`);
    }
}

export default new SellerDataService();
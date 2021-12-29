import http from "../http-common";

class CertDataService {
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }
    findByVP(vp) {
        return http.get(`/certificates?vp=${vp}`);
    }
}

export default new CertDataService();
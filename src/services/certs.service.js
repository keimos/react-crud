import http from "../http-commons";

class CertDataService {
    getAll() {
        return http.get("/certificates");
    }

    get(id) {
        return http.get(`/certificates/${id}`);
    }

    create(data) {
        return http.post("/certificates", data);
    }

    update(id, data) {
        return http.put(`/certificates/${id}`, data);
    }
    findByVP(vp) {
        return http.get(`/certificates?vp=${vp}`);
    }
}

export default new CertDataService();
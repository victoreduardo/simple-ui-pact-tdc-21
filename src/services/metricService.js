import api from "./api";

const metricService = {
    async create(requestData) {
        let responseData = {};
        let responseStatus = null;
        let responseError = null;

        await api.post("metrics", requestData).then(response => {
            responseStatus = response.status;
            responseData = response.data;
        }).catch(error => {
            responseError = error.response.data.error || 'Service Unavailable';
            responseStatus = error.response.status || 503;
        });

        return [responseStatus, responseData, responseError];
    }
}

export default metricService;

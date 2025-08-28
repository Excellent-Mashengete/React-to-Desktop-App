import axios from 'axios';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }

    async callApi(path, method, { data = null, params = null } = {}) {
        const response = await this.client.request({
            url: path,
            method: method,
            data: data,
            params: params,
        });

        return response.data;
    }

    async getAllEmployees() {
        return this.client.get('/test/employees', 'GET');
    }

    async getEmployeeById(employeeId) {
        let url = '/test/employees'
        if (employeeId) {
            url += `/?employee=${employeeId}`;
        }
        return this.client.post(url, 'GET');
    }

    async createEmployee(employeeData) {
        return this.client.post('/test/employees', employeeData);
    }

    async updateEmployee(employeeId, employeeData) {
        return this.client.put(`/test/employees/${employeeId}`, employeeData);
    }   
}

ApiClient.instance = new ApiClient();
export default ApiClient;
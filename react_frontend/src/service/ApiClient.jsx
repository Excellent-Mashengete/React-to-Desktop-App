import axios from 'axios';

const baseURL = `http://localhost:5004/api`;

const ApiClient = {

    getAllEmployees: async () => {
        try {
            const response = await axios.get(
                `${baseURL}/test/employees`,
                {
                    timeout: 3000,
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            return response;
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                console.log('The request timed out.');
            } else {
                console.log(err);
            }
        }
    },

    getEmployeeById: async (employeeId) => {
        try {
            let url = `${baseURL}/test/employee`
            if (employeeId) {
                url += `/?employee=${employeeId}`;
            }
            const response = await axios.get(url,
                {
                    timeout: 3000,
                    headers: {
                        Accept: 'application/json',
                    }, r
                },
            );
            return response;
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                console.log('The request timed out.');
            } else {
                console.error("Error fetching employee by ID:", err);
            }
        }
    },

    createEmployee: async (formData) => {
        const data = {
            FullName: formData.fullName,
            Email: formData.email,
            Position:  "Tester",
            Salary: formData.salary,
            DateHired: formData.dateHired,
            IsDeleted: formData.isActive,
            DepartmentId: 2,
            IsDeleted: false
        }
        const response = await axios.post(`${baseURL}/test/addEmployee`, data, {
            timeout: 3000,
            headers: {
                Accept: 'application/json',
            },
            }
        );
        return response;

    },

    updateEmployee: async (employeeId, formData) => {
        try {
            const data = {
                FullName: formData.fullName,
                Email: formData.email,
                Position: formData.position ?? "hello",
                Salary: formData.salary,
                DateHired: formData.dateHired,
                IsDeleted: formData.isActive,
                DepartmentId: 2,
                IsDeleted: 0
            }
            const response = await axios.post(`${baseURL}/test/employees/${employeeId}`, data, {
                timeout: 3000,
                headers: {
                    Accept: 'application/json',
                },
            });
            return response;
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                console.log('The request timed out.');
            } else {
                console.error("Error fetching employee by ID:", err);
            }
        }
    }
}

export default ApiClient;

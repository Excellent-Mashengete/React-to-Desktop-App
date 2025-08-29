namespace Employee.Data.Interfaces;


public interface IEmployeeRepository
{
    public Task<IEnumerable<Models.Employee>> GetAllEmployeesAsync();
    public Task<Models.Employee?> GetEmployeeByIdAsync(int id);
    public Task<Models.Employee> AddEmployeeAsync(Models.Employee employee);
    public Task<Models.Employee?> UpdateEmployeeAsync(Models.Employee employee);
    public Task<Models.Employee?> DeleteEmployeeAsync(int id);
}
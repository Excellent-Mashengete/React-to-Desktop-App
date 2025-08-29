using Employee.Data.Interfaces;

namespace Employee.Domain.Services;

/// <summary>
/// /
/// </summary>
public class EmployeeService
{
    private readonly IEmployeeRepository _iEmployeeRepository;
    
    /// <summary>
    /// 
    /// </summary>
    /// <param name="iEmployeeRepository"></param>
    public EmployeeService(IEmployeeRepository iEmployeeRepository)
    {
        _iEmployeeRepository = iEmployeeRepository;
    }

    public async Task<Data.Models.Employee> GetEmployeeByIdAsync(int id)
    {
        return await _iEmployeeRepository.GetEmployeeByIdAsync(id);
    }

    public async Task<IEnumerable<Data.Models.Employee>> GetEmployeeListAsync()
    {
        return await _iEmployeeRepository.GetAllEmployeesAsync();
    }

    public async Task<Data.Models.Employee> AddEmployeeAsync(Data.Models.Employee emp)
    {
        return await _iEmployeeRepository.AddEmployeeAsync(emp);
    }
    
    public async Task<Data.Models.Employee> DeleteEmployeeAsync(int id)
    {
        return await _iEmployeeRepository.DeleteEmployeeAsync(id);
    }
    
    public async Task<Data.Models.Employee> UpdateEmployeeAsync(Data.Models.Employee emp)
    {
        return await _iEmployeeRepository.UpdateEmployeeAsync(emp);
    }
}
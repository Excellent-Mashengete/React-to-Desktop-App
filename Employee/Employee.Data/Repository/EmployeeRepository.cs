using Employee.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Employee.Data.Repository;

public class EmployeeRepository: IEmployeeRepository
{
    private readonly ApplicationDBContext _context;
    
    public EmployeeRepository(ApplicationDBContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<Models.Employee>> GetAllEmployeesAsync()
    {
        return await _context.Employees.Include(e => e.Department).ToListAsync();
    }

    public async Task<Models.Employee?> GetEmployeeByIdAsync(int id)
    {
        return await _context.Employees
            .Include(s => s.Department)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Models.Employee> AddEmployeeAsync(Models.Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<Models.Employee?> UpdateEmployeeAsync(Models.Employee employee)
    {
        var temp = await GetEmployeeByIdAsync(employee.Id);
        if (temp == null)
        {
            return null;
        }
        temp.Email = employee.Email;
        temp.FirstName = employee.FirstName;
        temp.LastName = employee.LastName;
        temp.Position = employee.Position;
        temp.DateHired = employee.DateHired;
        temp.Salary = employee.Salary;
        temp.IsDeleted = employee.IsDeleted;
        
        _context.Entry(temp).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<Models.Employee?> DeleteEmployeeAsync(int id)
    {
        var temp = await GetEmployeeByIdAsync(id);
        if (temp == null)
        {
            return null;
        }
        _context.Employees.Remove(temp);
        await _context.SaveChangesAsync();
        return temp;
    }
}
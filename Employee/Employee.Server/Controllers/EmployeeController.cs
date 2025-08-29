using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Employee.Domain.Services;
using Employee.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Employee.Server.Extentions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Employee.Server.Controllers;

[ApiController]
[Route("api/test")]
public class EmployeeController: ControllerBase
{
    private readonly EmployeeService _employeeService;
    
    /// <summary>
    /// 
    /// </summary>
    /// <param name="employeeService"></param>
    public EmployeeController(EmployeeService employeeService)
    {
        _employeeService = employeeService;
    }
    
    [HttpGet("employees",Name = "employees")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<EmployeePerson>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetEmployees()
    {
        var employees = await _employeeService.GetEmployeeListAsync();
        
        if(employees == null || !employees.Any())
            return NotFound("No employees found.");
        
        return Ok(employees.ToEmployeePerson());
    }

    [HttpGet("employee", Name = "employee")]
    public async Task<IActionResult> GetEmployeeById([FromQuery] int employee)
    {
        var emp = await _employeeService.GetEmployeeByIdAsync(employee);
        if (emp == null)
            return NotFound($"Employee with id {employee} not found.");
        
        var empPerson = new EmployeePerson
        {
            Email = emp.Email,
            EmployeeNo = emp.Id,
            Position =  emp.Position,
            DateHired =  emp.DateHired,
            IsDeleted =  emp.IsDeleted,
            Salary =  emp.Salary, 
            DepartmentId = emp.DepartmentId,
            DepartmentName = emp.Department?.Name ?? string.Empty,
            FullName =  $"{emp.FirstName} {emp.LastName}"
        };
        
        return Ok(empPerson);
    }
    
    [HttpPost("addEmployee", Name = "addEmployee")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmployeePerson))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddEmployee([FromBody] EmployeePerson model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var addedEmp = await _employeeService.AddEmployeeAsync(new Data.Models.Employee{
            FirstName = model.FullName.Split(' ')[0],
            LastName = model.FullName.Split(' ').Length > 1 ? model.FullName.Split(' ')[1] : "",
            Position = model.Position,
            Email = model.Email,
            Salary = model.Salary,
            DateHired = model.DateHired,
            IsDeleted = model.IsDeleted,
            DepartmentId = model.DepartmentId
        });
        
        if(addedEmp == null)
            return BadRequest(new {success = false, message = "Could not add the employee."});
        
        var empPerson = new EmployeePerson
        {
            Email = addedEmp.Email,
            Position = addedEmp.Position,
            DateHired = addedEmp.DateHired,
            IsDeleted = addedEmp.IsDeleted,
            Salary = addedEmp.Salary,
            FullName = $"{addedEmp.FirstName} {addedEmp.LastName}",
            DepartmentId = addedEmp.DepartmentId,
            DepartmentName = addedEmp.Department?.Name ?? string.Empty
        };
        return Ok(new { success= true, message = "Employee created successfully.", employee = empPerson});
    }

    [HttpPut("updateEmployee", Name = "updateEmployee")]
    public async Task<IActionResult> UpdateEmployee([FromBody] EmployeePerson emp)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var updatedEmp = await _employeeService.UpdateEmployeeAsync(new Data.Models.Employee
        {
            Id = emp.EmployeeNo,
            FirstName = emp.FullName.Split(' ')[0],
            LastName = emp.FullName.Split(' ').Length > 1 ? emp.FullName.Split(' ')[1] : "",
            Position = emp.Position,
            Email = emp.Email,
            Salary = emp.Salary,
            DateHired = emp.DateHired,
            IsDeleted = emp.IsDeleted,
            DepartmentId = emp.DepartmentId
        });
        
        if(updatedEmp == null)
            return BadRequest(new {success = false, message = "Could not update the employee."});
        
        var empPerson = new EmployeePerson
        {
            Email = updatedEmp.Email,
            EmployeeNo = updatedEmp.Id,
            Position =  updatedEmp.Position,
            DateHired =  updatedEmp.DateHired,
            IsDeleted =  updatedEmp.IsDeleted,
            Salary =  updatedEmp.Salary, 
            FullName =  $"{updatedEmp.FirstName} {updatedEmp.LastName}",
            DepartmentId = updatedEmp.DepartmentId,
            DepartmentName = updatedEmp.Department?.Name ?? string.Empty
        };
        return Ok(new { success= true, message = "Employee updated successfully.", employee = empPerson});
    }
} 
using System.Collections.Generic;
using Employee.Server.Models;

namespace Employee.Server.Extentions;

public static class EmployeeExtention
{
    public static List<EmployeePerson> ToEmployeePerson(this IEnumerable<Data.Models.Employee> employees)
    {
        var empPerson = new List<EmployeePerson>();
        foreach (var employee in employees)
        {
            empPerson.Add(new EmployeePerson
            {
                Email = employee.Email,
                EmployeeNo = employee.Id,
                Position =  employee.Position,
                DateHired =  employee.DateHired,
                IsDeleted =  employee.IsDeleted,
                Salary =  employee.Salary, 
                FullName =  $"{employee.FirstName} {employee.LastName}",
                DepartmentId = employee.DepartmentId,
                DepartmentName = employee.Department?.Name ?? string.Empty
            });
        }
        return empPerson;
    }
    
    
}
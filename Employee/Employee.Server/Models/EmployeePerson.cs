using System;
using System.ComponentModel.DataAnnotations;

namespace Employee.Server.Models;

public class EmployeePerson
{
    [Required]
    public string FullName { get; set; } = string.Empty;
    
    public int EmployeeNo { get; set; }
    
    [Required]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Position { get; set; } = string.Empty;
    
    public decimal Salary { get; set; }
    
    [Required]
    public DateTime DateHired { get; set; }
    
    public bool IsDeleted { get; set; }
    
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
}
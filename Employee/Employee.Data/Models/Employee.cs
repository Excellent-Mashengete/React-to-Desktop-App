namespace Employee.Data.Models;

public class Employee
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Position { get; set; }
    public string Email { get; set; }
    public decimal Salary { get; set; }
    public DateTime DateHired { get; set; }
    public bool IsDeleted { get; set; }
    
    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;
}
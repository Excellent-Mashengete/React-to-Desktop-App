using Employee.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Employee.Data.Repository;

public class ApplicationDBContext : DbContext
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="options"></param>
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options): base(options) {}
    
    public DbSet<Models.Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Department>().HasData(
            new Department { Id = 1, Name = "Human Resources" },
            new Department { Id = 2, Name = "IT" },
            new Department { Id = 3, Name = "Finance" }
        );
    }

}
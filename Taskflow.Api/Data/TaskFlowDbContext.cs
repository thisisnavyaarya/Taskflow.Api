using Microsoft.EntityFrameworkCore;
using Taskflow.Api.Models;


namespace Taskflow.Api.Data
{
    public class TaskFlowDbContext :DbContext
    {
        public TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> options) :base(options)
        {

        }
        public DbSet<TaskItem> Tasks { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}

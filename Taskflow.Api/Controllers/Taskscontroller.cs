using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskflow.Api.Data;
using Taskflow.Api.Models;

namespace Taskflow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskFlowDbContext _context;
        public TasksController(TaskFlowDbContext context)
        {
            _context = context;
        }

        [HttpGet]
       public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
                
        }
    }
}

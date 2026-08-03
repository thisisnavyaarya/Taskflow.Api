using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Taskflow.Api.Models;

namespace Taskflow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> _tasks = new()
        {
            new TaskItem { Id = 1, Title = "Task 1", Description = "Description for Task 1", IsCompleted = false },
            new TaskItem { Id = 2, Title = "Task 2", Description = "Description for Task 2", IsCompleted = true },
        };
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(_tasks);
        }
    }
}

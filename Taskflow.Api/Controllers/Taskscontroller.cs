using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Taskflow.Api.Data;
using Taskflow.Api.Models;

namespace Taskflow.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskFlowDbContext _context;
        private readonly IDistributedCache _cache;
        public TasksController(TaskFlowDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpGet]
       public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            const string cacheKey = "all_tasks";
            var cachedTasks = await _cache.GetStringAsync(cacheKey);
            if (cachedTasks != null)
            {
                var tasksFromCache = System.Text.Json.JsonSerializer.Deserialize<List<TaskItem>>(cachedTasks);
                return Ok(tasksFromCache);
            }
            var tasks = await _context.Tasks.ToListAsync();
            var serializedTasks = System.Text.Json.JsonSerializer.Serialize(tasks);
            await _cache.SetStringAsync(cacheKey, serializedTasks, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            await _cache.RemoveAsync("all_tasks");
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem UpdateTask)
        {
            var task = await _context.Tasks.FindAsync(id);
            if(task==null)
            {
                return NotFound();
            }
            task.Title = UpdateTask.Title;
            task.Description = UpdateTask.Description;
            task.IsCompleted = UpdateTask.IsCompleted;

            await _context.SaveChangesAsync();
            await _cache.RemoveAsync("all_tasks");
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if(task==null)
            {
                return NotFound();
            }
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            await _cache.RemoveAsync("all_tasks");
            return NoContent();
                
        }
    }
}

namespace Taskflow.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string username { get; set; } = string.Empty;
        public string PasswordHash { get; set; }= string.Empty;
    }
}

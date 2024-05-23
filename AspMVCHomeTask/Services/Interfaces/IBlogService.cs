using AspMVCHomeTask.Models;

namespace AspMVCHomeTask.Services.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<Blog>> GetAllAsync();

    }
}

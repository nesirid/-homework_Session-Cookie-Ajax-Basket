using AspMVCHomeTask.Data;
using AspMVCHomeTask.Models;
using AspMVCHomeTask.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AspMVCHomeTask.Services
{
    public class BlogService : IBlogService
    {
        private readonly AppDbContext _context;

        public BlogService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Blog>> GetAllAsync()
        {
            return await _context.Blogs.ToListAsync();
        }
    }
}

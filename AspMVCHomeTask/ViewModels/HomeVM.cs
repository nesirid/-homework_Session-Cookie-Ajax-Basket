using AspMVCHomeTask.Models;
using System.Reflection.Metadata;

namespace AspMVCHomeTask.ViewModels
{
    public class HomeVM
    {
        public IEnumerable<Blog> Blogs { get; set; }
        public IEnumerable<Category> Categories { get; set; }
        public IEnumerable<Product> Products { get; set; }
    }
}

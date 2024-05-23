using Microsoft.AspNetCore.Mvc;
using AspMVCHomeTask.Models;
using AspMVCHomeTask.Services.Interfaces;
using AspMVCHomeTask.Data;

namespace AspMVCHomeTask.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly AppDbContext _context;

        public ProductsController(IProductService productService, ICategoryService categoryService, AppDbContext context)
        {
            _productService = productService;
            _categoryService = categoryService;
            _context = context;
        }

        public async Task<IActionResult> Create()
        {
            ViewBag.Categories = await _categoryService.GetAllAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Product product)
        {
            if (ModelState.IsValid)
            {
                product.Category = await _categoryService.GetByIdAsync(product.Category.Id);
                await _productService.AddProductAsync(product);
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Categories = await _categoryService.GetAllAsync();
            return View(product);
        }

        public async Task<IActionResult> Index()
        {
            var products = await _productService.GetAllAsync();
            return View(products);
        }

        public IActionResult Cart()
        {
            var products = _context.Products.ToList();
            return View(products);
        }
    }
}

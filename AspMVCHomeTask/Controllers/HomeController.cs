using AspMVCHomeTask.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AspMVCHomeTask.ViewModels;

namespace AspMVCHomeTask.Controllers
{
	public class HomeController : Controller
	{
		private readonly ISliderService _sliderService;
		private readonly IBlogService _blogService;
		private readonly ICategoryService _categoryService;
		private readonly IProductService _productService;
		private readonly IHttpContextAccessor _accessor;

		public HomeController(ISliderService sliderService,
							  IBlogService blogService,
							  ICategoryService categoryService,
							  IProductService productService,
							  IHttpContextAccessor accessor)
		{
			_sliderService = sliderService;
			_blogService = blogService;
			_categoryService = categoryService;
			_productService = productService;
			_accessor = accessor;
		}

		public async Task<IActionResult> Index()
		{
			_accessor.HttpContext.Response.Cookies.Append("name", "Reshad");

			HomeVM model = new HomeVM
			{
				Blogs = await _blogService.GetAllAsync(),
				Categories = await _categoryService.GetAllAsync(),
				Products = await _productService.GetAllAsync()
			};

			Book book1 = new()
			{
				Id = 1,
				Name = "Xosrov"
			};

			return View(model);
		}
		public IActionResult GetCookieData()
		{
          var data = _accessor.HttpContext.Request.Cookies["name"];

			return Json(data);
		}
	}
}

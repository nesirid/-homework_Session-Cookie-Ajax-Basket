using NuGet.Protocol.Plugins;
using AspMVCHomeTask.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AspMVCHomeTask.Services.Interfaces
{
    public interface ISliderService
    {
        Task<List<Slider>> GetAllAsync();
    }
}

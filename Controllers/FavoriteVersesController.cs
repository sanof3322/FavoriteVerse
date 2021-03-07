using System.Threading.Tasks;
using FavoriteVerse.Services.VerseService;
using Microsoft.AspNetCore.Mvc;

namespace favoriteverse.Controllers
{
    [ApiController]
    [Route("favorite-verses")]
    public class FavoriteVersesController : ControllerBase
    {
        private readonly VerseService _service;
        public FavoriteVersesController(VerseService service)
        {
            _service = service;
        }

        public async Task<IActionResult> Get(){
            return Ok(await _service.GetAllFavorites());
        }
    }
}
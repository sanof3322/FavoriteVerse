using System;
using System.Threading.Tasks;
using FavoriteVerse.Services.KLoveAPIService;
using FavoriteVerse.Services.VerseService;
using Microsoft.AspNetCore.Mvc;

namespace FavoriteVerses.Controllers
{
    [ApiController]
    [Route("favorite-verses")]
    public class FavoriteVersesController : ControllerBase
    {
        private readonly IVerseService _service;
        private readonly IKLoveAPIService _kLoveAPIService;
        public FavoriteVersesController(IVerseService service, IKLoveAPIService kLoveAPIService)
        {
            _service = service;
            _kLoveAPIService = kLoveAPIService;
        }
        /// <summary>
        /// Used to get favorite verses based on UserId
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Get(string UserId){
            return Ok(await _service.GetAllFavorites(UserId));
        }
    }
}
using System;
using System.Threading.Tasks;
using FavoriteVerse.Services.VerseService;
using FavoriteVerse.Dtos.Verse;
using Microsoft.AspNetCore.Mvc;

namespace FavoriteVerse.Controllers
{
    [ApiController]
    [Route("verse")]
    public class VerseController : ControllerBase
    {
        private readonly IVerseService _service;
        public VerseController(IVerseService service)
        {
            _service = service;
        }
        
        /// <summary>
        /// Adds a verse to favorites
        /// </summary>
        /// <param name="verse">Verse DTO</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add(AddVerseDTO verse){
            return Ok(await _service.Add(verse));
        }

        /// <summary>
        /// Removes a verse from favorites
        /// </summary>
        /// <param name="Id">Id of a verse</param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid Id){
            return Ok(await _service.Delete(Id));
        }
    }
}
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
        private readonly VerseService _service;
        public VerseController(VerseService service)
        {
            _service = service;
        }
        
        [HttpPost]
        public async Task<IActionResult> Add(AddVerseDTO verse){
            return Ok(await _service.Add(verse));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid Id){
            return Ok(await _service.Delete(Id));
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FavoriteVerse.Dtos.Character;
using FavoriteVerse.Models;
using FavoriteVerse.Services.CharacterService;
using Microsoft.AspNetCore.Mvc;

namespace FavoriteVerse.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : ControllerBase
    {
        private static Character knight = new Character();
      
        private readonly ICharacterService _characterService;

        public CharacterController(ICharacterService characterService){
            _characterService = characterService;
        }

        [Route("GetAll")]
        public async Task<IActionResult> Get(){
            return Ok(await _characterService.GetFavoriteVerses());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id){
            return Ok(await _characterService.GetCharactersById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddCharacter(AddCharacterDto newCharacter){            
            return Ok(await _characterService.AddCharacter(newCharacter));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCharacter(UpdateCharacterDto updatedCharacter){      
            ServiceResponse<GetCharacterDto> response = await _characterService.UpdateCharacter(updatedCharacter);
            if(response.Data == null){
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            ServiceResponse<List<GetCharacterDto>> response = await _characterService.DeleteCharacter(id);
            if(response.Data == null){
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
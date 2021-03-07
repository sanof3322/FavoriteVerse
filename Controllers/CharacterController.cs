using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FavoriteVerse.Models.External;
using FavoriteVerse.Dtos.Character;
using FavoriteVerse.Models;
using FavoriteVerse.Services.CharacterService;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FavoriteVerse.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : ControllerBase
    {
        private static Character knight = new Character();
      
        private readonly ICharacterService _characterService;
        private readonly IHttpClientFactory _client;

        public CharacterController(ICharacterService characterService, IHttpClientFactory client){
            _characterService = characterService;
             _client = client;
        }

        [Route("GetAll")]
        public async Task<IActionResult> Get(){
            return Ok(await _characterService.GetFavoriteVerses());
        }

        [Route("verses")]
        public async Task<IActionResult> Verses(){
            DateTime? startdate = DateTime.Now;
            int PageSize = 10;
            var client = _client.CreateClient("KLoveAPIClient");
            string response = await client.GetStringAsync($"?siteId=1&startdate={startdate}&PageSize={PageSize}");
            KLoveVersesWrapper json = JsonConvert.DeserializeObject<KLoveVersesWrapper>(response);
            return Ok(response);
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
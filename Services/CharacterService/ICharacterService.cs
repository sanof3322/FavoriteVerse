using System.Collections.Generic;
using System.Threading.Tasks;
using FavoriteVerse.Dtos.Character;
using FavoriteVerse.Models;
using FavoriteVerse.Models.Local;

namespace FavoriteVerse.Services.CharacterService
{
    public interface ICharacterService
    {
        Task<ServiceResponse<List<GetCharacterDto>>> GetAllCharacters();
        Task<ServiceResponse<GetCharacterDto>> GetCharactersById(int id);
        Task<ServiceResponse<List<GetCharacterDto>>> AddCharacter(AddCharacterDto newCharacter);
        Task<ServiceResponse<GetCharacterDto>> UpdateCharacter(UpdateCharacterDto updatedCharacter);
        Task<ServiceResponse<List<GetCharacterDto>>> DeleteCharacter(int id);
        Task<ServiceResponse<List<TbFavoriteVerse>>> GetFavoriteVerses();
    }

}
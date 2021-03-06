using System.Collections.Generic;
using System.Threading.Tasks;
using FavoriteVerse.Dtos.Verse;
using FavoriteVerse.Models;

namespace FavoriteVerse.Services.Verse
{
    public interface IVerse
    {
        Task<ServiceResponse<List<GetVerseDTO>>> GetAllVerses();
        Task<ServiceResponse<GetVerseDTO>> GetVerseById(int id);
        Task<ServiceResponse<List<GetVerseDTO>>> AddVerse(AddVerseDTO newCharacter);
        Task<ServiceResponse<GetVerseDTO>> UpdateVerse(UpdateVerseDTO updatedCharacter);
        Task<ServiceResponse<List<GetVerseDTO>>> DeleteVerse(int id);
    }
}
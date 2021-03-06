using System.Collections.Generic;
using System.Threading.Tasks;
using FavoriteVerse.Models;
using FavoriteVerse.Models.External;

namespace FavoriteVerse.Services.KLoveAPIService
{
    public interface IKLoveAPIService
    {
         Task<ServiceResponse<List<KLoveVerses>>> GetAllCharacters();
    }
}
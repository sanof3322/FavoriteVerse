using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FavoriteVerse.Dtos.Verse;
using FavoriteVerse.Models;
using FavoriteVerse.Models.Local;

namespace FavoriteVerse.Services.VerseService
{
    public interface IVerseService
    {
         public Task<ServiceResponse<List<TbFavoriteVerse>>> GetAllFavorites();
         public Task<ServiceResponse<bool>> Delete(Guid Id);
         public Task<ServiceResponse<TbFavoriteVerse>> Add(AddVerseDTO verse);
    }
}
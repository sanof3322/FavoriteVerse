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
        /// <summary>
        /// Gets a list of faforite verses based on a userId
        /// </summary>
        /// <param name="UserId">UserId filter</param>
        /// <returns>Collection of favorite verses</returns>
         public Task<ServiceResponse<List<TbFavoriteVerse>>> GetAllFavorites(string UserId);

         /// <summary>
         /// Deletes specified verse from favorites
         /// </summary>
         /// <param name="Id">Id of a verse that's being deleted</param>
         /// <returns></returns>
         public Task<ServiceResponse<bool>> Delete(Guid Id);

         /// <summary>
         /// Adds verse to the collection of favorite verses
         /// </summary>
         /// <param name="verse">Verse DTO</param>
         /// <returns>Collection of favorite verses</returns>
         public Task<ServiceResponse<TbFavoriteVerse>> Add(AddVerseDTO verse);
    }
}
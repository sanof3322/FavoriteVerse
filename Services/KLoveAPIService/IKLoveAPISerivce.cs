using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FavoriteVerse.Models;
using FavoriteVerse.Models.External;

namespace FavoriteVerse.Services.KLoveAPIService
{
    public interface IKLoveAPIService
    {
        /// <summary>
        /// Gets verses from K-Love API
        /// </summary>
        /// <param name="startdate">Start date</param>
        /// <param name="PageSize">Number of verses to show</param>
        /// <returns>Collection of verses</returns>
        Task<ServiceResponse<KLoveVersesWrapper>> GetVerseByDate(DateTime startdate, int PageSize);
    }
}
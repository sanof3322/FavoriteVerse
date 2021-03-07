using AutoMapper;
using FavoriteVerse.Dtos.Verse;
using FavoriteVerse.Models;
using FavoriteVerse.Models.Local;

namespace FavoriteVerse{
    public class AutoMapperProfile: Profile{
        public AutoMapperProfile()
        {
            CreateMap<AddVerseDTO, TbFavoriteVerse>();
            CreateMap<TbFavoriteVerse, AddVerseDTO>();
        }
    }
}
using AutoMapper;
using FavoriteVerse.Dtos.Character;
using FavoriteVerse.Dtos.Verse;
using FavoriteVerse.Models;
using FavoriteVerse.Models.Local;

namespace FavoriteVerse{
    public class AutoMapperProfile: Profile{
        public AutoMapperProfile()
        {
            CreateMap<Character, GetCharacterDto>();
            CreateMap<AddCharacterDto, Character>();
            CreateMap<AddVerseDTO, TbFavoriteVerse>();
            CreateMap<TbFavoriteVerse, AddVerseDTO>();
        }
    }
}
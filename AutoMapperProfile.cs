using AutoMapper;
using FavoriteVerse.Dtos.Character;
using FavoriteVerse.Models;

namespace FavoriteVerse{
    public class AutoMapperProfile: Profile{
        public AutoMapperProfile()
        {
            CreateMap<Character, GetCharacterDto>();
            CreateMap<AddCharacterDto, Character>();
        }
    }
}
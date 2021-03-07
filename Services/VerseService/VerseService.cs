using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FavoriteVerse.Dtos.Verse;
using FavoriteVerse.Models;
using FavoriteVerse.Models.Local;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace FavoriteVerse.Services.VerseService
{
    public class VerseService : IVerseService
    {
        private readonly KLoveVersesContext _context;
        private readonly IMapper _mapper;
        public VerseService(KLoveVersesContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<TbFavoriteVerse>> Add(AddVerseDTO verse)
        {
            ServiceResponse<TbFavoriteVerse> serviceResponse = new ServiceResponse<TbFavoriteVerse>();
            TbFavoriteVerse favoriteVerse = _mapper.Map<TbFavoriteVerse>(verse);
            favoriteVerse.DateAdded = DateTime.Now;
            try{
                var response = await _context.TbFavoriteVerses.AddAsync(favoriteVerse);
                serviceResponse.Data = _mapper.Map<TbFavoriteVerse>(response.Entity);
                await _context.SaveChangesAsync();
            }catch(Exception ex){
                serviceResponse.Data = null;
                serviceResponse.Message = ex.Message + JsonConvert.SerializeObject(serviceResponse.Data);
                serviceResponse.Success = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> Delete(Guid Id)
        {
            ServiceResponse<bool> serviceResponse  = new ServiceResponse<bool>();
            try{
                TbFavoriteVerse verse = await _context.TbFavoriteVerses.FirstOrDefaultAsync(v => v.Id == Id);
                _context.Remove(verse);
                serviceResponse.Data = true;
                await _context.SaveChangesAsync();
            }catch(Exception ex){
                serviceResponse.Data = false;
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;

        }

        public async Task<ServiceResponse<List<TbFavoriteVerse>>> GetAllFavorites()
        {
            ServiceResponse<List<TbFavoriteVerse>> serviceResponse = new ServiceResponse<List<TbFavoriteVerse>>();
            try{
                serviceResponse.Data =   await _context.TbFavoriteVerses.ToListAsync();
            }catch(Exception ex){
                serviceResponse.Message = ex.Message;
                serviceResponse.Data = null;
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }
    }
}
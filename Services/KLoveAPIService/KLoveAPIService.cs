using System;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using FavoriteVerse.Models;
using FavoriteVerse.Models.External;
using FavoriteVerse.Services.KLoveAPIService;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace favoriteverse.Services.KLoveAPIService
{
    public class KLoveAPIService : IKLoveAPIService
    {
        private readonly IMapper _mapper;
        private readonly IHttpClientFactory _client;
        public KLoveAPIService(IMapper mapper, IHttpClientFactory client)
        {
            _mapper = mapper;
            _client = client;
        }
        
        public async Task<ServiceResponse<KLoveVersesWrapper>> GetVerseByDate(DateTime startdate, int PageSize)
        {
            ServiceResponse<KLoveVersesWrapper> serviceResponse = new ServiceResponse<KLoveVersesWrapper>();
            var client = _client.CreateClient("KLoveAPIClient");
            try{
                string response = await client.GetStringAsync($"?siteId=1&startdate={startdate}&PageSize={PageSize}");
                KLoveVersesWrapper json = JsonConvert.DeserializeObject<KLoveVersesWrapper>(response);
                serviceResponse.Data = json;
            }catch(Exception ex){
                serviceResponse.Data = null;
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }
            
            return serviceResponse;
        }
    }
}
using System.Collections.Generic;
using FavoriteVerse.Models.External;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace FavoriteVerse.Models.External
{
    public class KLoveVersesWrapper
    {
        public List<KLoveVerse> Verses { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public bool HasMorePages { get; set; }
        public string Id { get; set; }
        public string URL { get; set; }
    }
}
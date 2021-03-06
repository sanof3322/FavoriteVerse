using System;
using System.Collections.Generic;

#nullable disable

namespace FavoriteVerse.Models.Local
{
    public partial class TbFavoriteVerse
    {
        public Guid Id { get; set; }
        public string VerseText { get; set; }
        public string ImageLink { get; set; }
        public DateTime? VerseDate { get; set; }
        public string VideoLink { get; set; }
        public string ReferenceLink { get; set; }
        public int? VerseNumbers { get; set; }
        public int? Chapter { get; set; }
        public string Book { get; set; }
        public string ReferenceText { get; set; }
        public string BibleReferenceLink { get; set; }
        public string FacebookShareUrl { get; set; }
        public string TwitterShareUrl { get; set; }
        public string PinterestShareUrl { get; set; }
        public bool IsValid { get; set; }
        public string UserId { get; set; }
        public DateTime DateAdded { get; set; }
    }
}

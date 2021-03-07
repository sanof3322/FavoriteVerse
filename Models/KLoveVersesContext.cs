using System;
using FavoriteVerse.Models.Local;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace FavoriteVerse.Models
{
    public partial class KLoveVersesContext : DbContext
    {
        public KLoveVersesContext(DbContextOptions options)
            : base(options)
        {
        }

        public virtual DbSet<TbFavoriteVerse> TbFavoriteVerses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<TbFavoriteVerse>(entity =>
            {
                entity.ToTable("tbFavoriteVerses");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.BibleReferenceLink).HasMaxLength(1000);

                entity.Property(e => e.Book).HasMaxLength(1000);

                entity.Property(e => e.FacebookShareUrl).HasMaxLength(1000);

                entity.Property(e => e.ImageLink).HasMaxLength(1000);

                entity.Property(e => e.PinterestShareUrl)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.ReferenceLink).HasMaxLength(1000);

                entity.Property(e => e.ReferenceText).HasMaxLength(1000);

                entity.Property(e => e.TwitterShareUrl).HasMaxLength(1000);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.VerseDate).HasColumnType("datetime");

                entity.Property(e => e.VerseText)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.VideoLink).HasMaxLength(1000);
            });

            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

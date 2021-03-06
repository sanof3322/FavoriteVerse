using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace FavoriteVerse.Models.Local
{
    public partial class KLoveVersesContext : DbContext
    {
        public KLoveVersesContext()
        {
        }

        public KLoveVersesContext(DbContextOptions<KLoveVersesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FavoriteVerse> FavoriteVerses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=favoriteverse.database.windows.net;Initial Catalog=KLoveVerses;User Id=favoriteverse;Password=t@estUser2021@");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<FavoriteVerse>(entity =>
            {
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

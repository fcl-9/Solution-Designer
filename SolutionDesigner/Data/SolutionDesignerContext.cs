using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SolutionDesigner.Models
{
    public class SolutionDesignerContext : DbContext
    {
        public SolutionDesignerContext (DbContextOptions<SolutionDesignerContext> options): base(options)
        {
        }

        public DbSet<SolutionDesigner.Models.DashboardItem> DashboardItem { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Any item will have its columns removed
            builder.Entity<DashboardItem>().HasMany(i => i.queries).WithOne(q => q.DashboardItem).OnDelete(DeleteBehavior.Cascade);
            
            // Any chart will have its columns removed.
            builder.Entity<ChartDashboardItem>().HasMany(i => i.columns).WithOne(q => q.ChartDashboardItem).OnDelete(DeleteBehavior.Cascade);

            // TextDashboardItem - Cacade delete dashboard item options
            builder.Entity<TextDashoardItem>().HasOne(i => i.TextOptions).WithOne(q => q.TextDashboardItem).HasForeignKey<TextElement>(t => t.Id).OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<SolutionDesigner.Models.AppDashboardItem> AppDashboardItem { get; set; }

        public DbSet<SolutionDesigner.Models.TextDashoardItem> TextDashoardItem { get; set; }

        public DbSet<SolutionDesigner.Models.ChartDashboardItem> ChartDashboardItem { get; set; }

        public DbSet<SolutionDesigner.Models.Image> Image{ get; set; }
    }
}

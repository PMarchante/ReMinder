using System;
using Domain;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {}
        public DbSet<Reminder> Reminder {get; set;}
        
        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

        }
    }
}
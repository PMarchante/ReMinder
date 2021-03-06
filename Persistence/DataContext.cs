using System;
using System.Threading.Tasks;
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
        public DbSet<Reminder> Reminders {get; set;}
        
        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

        }

        public Task singleordefault()
        {
            throw new NotImplementedException();
        }
    }
}
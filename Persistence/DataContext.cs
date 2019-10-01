using System;
using Domain;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {}
        public DbSet<Reminder> Reminders {get; set;}
    }
}
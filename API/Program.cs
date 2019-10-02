﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.Interfaces;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
           var host = CreateWebHostBuilder(args).Build();

           using(var scope = host.Services.CreateScope())
           {
               var services = scope.ServiceProvider;
               try{
                   var context = services.GetRequiredService<DataContext>();
                   var userManager = services.GetRequiredService<UserManager<AppUser>>();
                   
                   context.Database.Migrate();
                   Seed.SeedData(context, userManager).Wait();
               }
               catch(Exception e)
               {
                   var logger = services.GetRequiredService<ILogger<Program>>();
                   logger.LogError(e, "Error during migration");
               }
           }
           host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}

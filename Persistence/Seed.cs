using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

             if(!userManager.Users.Any()){
                var users = new List<AppUser>{

                    new AppUser
                    {
                        Email="Sally@test.com",
                        UserName="Sally",
                        
                    },
                    new AppUser
                    {
                        Email="Joe@test.com",
                        UserName="Joe",
                        
                    },
                    new AppUser
                    {
                        Email="Odin@test.com",
                        UserName="Odin",
                    },
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0rd");
                }

                context.SaveChanges();
            }

            }
           
        }
    }

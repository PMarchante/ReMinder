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
                        Displayname="Silly_Sally"
                        
                    },
                    new AppUser
                    {
                        Email="Joe@test.com",
                        UserName="Joe",
                        Displayname="JavaJoe"
                        
                    },
                    new AppUser
                    {
                        Email="Odin@test.com",
                        UserName="Odin",
                        Displayname="ThunderGod"
                    },
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0rd");
                }

                var sally = context.Users.SingleOrDefault(x => x.UserName=="Sally");
                var joe = context.Users.SingleOrDefault(x => x.UserName == "Joe");
                var odin = context.Users.SingleOrDefault(x => x.UserName == "Odin");

                var reminders = new List<Reminder>
                {
                    new Reminder
                    {
                        UserId= sally.Id,
                        Title="Beach day!",
                        Date= DateTime.Now.AddDays(2),
                        Description="Going to the beach with Brad",
                        Location="503 1st St N, Jacksonville Beach, FL 32250"
                    },
                    new Reminder
                    {
                        UserId= sally.Id,
                        Title="Take dog to vet",
                        Date= DateTime.Now.AddDays(10),
                        Description="Dog is due for shots",
                        Location="1210 3rd St N, Jacksonville Beach, FL 32250"
                    },
                    new Reminder
                    {
                        UserId= sally.Id,
                        Title="Dinner",
                        Date= DateTime.Now.AddDays(2),
                        Description="Dinner with parents",
                        Location="1712 Beach Blvd, Jacksonville Beach, FL 32250"
                    },
                    new Reminder
                    {
                        UserId= odin.Id,
                        Title="Hackathon event",
                        Date= DateTime.Now.AddDays(4),
                        Description="Acme Hackathon event with the team!",
                        Location="14286 Beach Blvd #2, Jacksonville, FL 32250"
                    },
                    new Reminder
                    {
                        UserId= odin.Id,
                        Title="Oil change",
                        Date= DateTime.Now.AddDays(1),
                        Description="Car is due for oil change",
                        Location="14026 Beach Blvd, Jacksonville, FL 32250"
                    },
                };
                context.AddRange(reminders);
                context.SaveChanges();
            }

            }
           
        }
    }

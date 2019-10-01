using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Reminders.Any())
            {
                var reminders = new List<Reminder>
                {
                    new Reminder
                    {
                        Title="Doctor's visit",
                        Date=DateTime.Now.AddMonths(1),
                        Description="Getting a checkup",
                        Location="8031 Philips Hwy # 6, Jacksonville, FL 32256"
                    },
                    new Reminder
                    {
                        Title="Take dog to vet",
                        Date=DateTime.Now.AddDays(15),
                        Description="Dog is due for vaccinations",
                        Location="8505 Baymeadows Rd, Jacksonville, FL 32256"
                    },
                    new Reminder
                    {
                        Title="Dinner with parents",
                        Date=DateTime.Now.AddHours(8),
                        Description="Meeting them at Olive Garden",
                        Location="6050 Youngerman Circle, Orange Park, Jacksonville, FL 32244"
                    },
                    new Reminder
                    {
                        Title="Prom!!",
                        Date=DateTime.Now.AddMonths(2),
                        Description="Prom day!",
                        Location="4412 Barnes Rd S, Jacksonville, FL 32207"
                    },
                    new Reminder
                    {
                        Title="Surfing with brad",
                        Date=DateTime.Now.AddDays(1),
                        Description="Meeting at Jax beach",
                        Location="503 1st St N, Jacksonville Beach, FL 32250"
                    }                 
                };
                context.Reminders.AddRange(reminders);
                context.SaveChanges();
            }
        }
    }
}
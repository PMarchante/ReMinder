using System;
using System.Collections.Generic;

namespace Domain
{
    public class Reminder
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        
        public string UserId { get; set; }
        
    }
}
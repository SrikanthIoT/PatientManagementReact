using System;
using System.Collections.Generic;
using System.Text;

namespace PatientManagement.Data.Entities
{
    public class State
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
    }
}

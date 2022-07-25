using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientManagement.Models
{
    public class PatientModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public int? GenderId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public int? StateId { get; set; }
        public string Zip { get; set; }
        public int? CountryId { get; set; }
        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string GenderName { get; set; }
    }
}

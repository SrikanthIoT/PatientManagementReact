using System;
using System.Collections.Generic;
using System.Text;

namespace PatientManagement.Data.Entities
{
    public class Patient
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int? GenderId { get; set; }
        public Gender Gender { get; set; }
        public int? AddressId { get; set; }
        public Address Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}

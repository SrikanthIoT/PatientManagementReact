namespace PatientManagement.Data.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public int? StateId { get; set; }
        public virtual State State { get; set; }
    }
}

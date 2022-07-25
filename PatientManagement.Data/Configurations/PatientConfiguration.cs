using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PatientManagement.Data.Entities;

namespace PatientManagement.Data.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.ToTable(nameof(Patient));
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.DateOfBirth).IsRequired(false);
            builder.HasOne(x => x.Gender).WithMany().HasForeignKey(x => x.GenderId);
            builder.HasOne(x => x.Address).WithMany().HasForeignKey(x => x.AddressId);
        }
    }
}

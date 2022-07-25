using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PatientManagement.Data.Entities;

namespace PatientManagement.Data.Configurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable(nameof(Address));
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.AddressLine1).IsRequired().HasMaxLength(1024);
            builder.Property(x => x.AddressLine2).IsRequired(false).HasMaxLength(1024);
            builder.Property(x => x.City).IsRequired(false).HasMaxLength(500);
            builder.HasOne(x => x.State).WithMany().HasForeignKey(x => x.StateId);
        }
    }
}

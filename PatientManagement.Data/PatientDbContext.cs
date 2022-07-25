using Microsoft.EntityFrameworkCore;
using PatientManagement.Data.Configurations;
using PatientManagement.Data.Entities;
using PatientManagement.Data.Seed;
using System;

namespace PatientManagement.Data
{
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions<PatientDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new AddressConfiguration());
            builder.ApplyConfiguration(new CountryConfiguration());
            builder.ApplyConfiguration(new GenderConfiguration());
            builder.ApplyConfiguration(new PatientConfiguration());
            builder.ApplyConfiguration(new StateConfiguration());
            builder.ApplyLookupSeeds();
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Country> Countries { get; set; }

        public DbSet<Gender> Genders { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<State> States { get; set; }
    }
}

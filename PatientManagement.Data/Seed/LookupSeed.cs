using Microsoft.EntityFrameworkCore;
using PatientManagement.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PatientManagement.Data.Seed
{
    public static class LookupSeed
    {
        public static void ApplyLookupSeeds(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gender>()
                .HasData(new List<Gender>()
                {
                    new Gender { Id=1,Name="M",Description="Male" },
                    new Gender { Id=2,Name="F",Description="Female" }
                });

            modelBuilder.Entity<Country>()
                .HasData(new List<Country>()
                {
                   new Country { Id=1,Name="USA",Description="USA" },
                    new Country { Id=2,Name="India",Description="India" }
                });
            modelBuilder.Entity<State>()
              .HasData(new List<State>()
              {
                   new State { Id=1,Name="TX",Description="Texas",CountryId=1 },
                   new State { Id=2,Name="AL",Description="Alabama",CountryId=1 },
                   new State { Id=3,Name="HY",Description="Hyderabad",CountryId=2 },
                   new State { Id=4,Name="TL",Description="Telengana",CountryId=2 }
              });
        }
    }
}

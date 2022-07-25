using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace PatientManagement.Data
{
    public static class Bootstrap
    {
        public static void UsePatientDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<PatientDbContext>(options => options.UseSqlServer(connectionString));
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientManagement.Data;
using PatientManagement.Data.Entities;
using PatientManagement.Models;

namespace PatientManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private PatientDbContext _db;
        public PatientController(PatientDbContext db)
        {
            _db = db;
        }
        // GET: api/Patient/GetPatients
        [HttpGet]
        [Route("[action]")]
        public async Task<IEnumerable<PatientModel>> GetPatients()
        {
            return await DoGetPatients();
        }

        // GET: api/Patient/CreatePatient
        [HttpPost]
        [Route("[action]")]
        public async Task<IEnumerable<PatientModel>> UpsertPatient(PatientModel model)
        {
            Patient existing = null;
            if(model.Id.HasValue && model.Id>0)
            {
                existing = _db.Patients.Include(x=>x.Address).FirstOrDefault(x => x.Id == model.Id);
            }
            if(existing?.Id!=null)
            {
                existing.Name = model.Name;
                existing.DateOfBirth = model.DateOfBirth;
                existing.GenderId = model.GenderId;
                if(existing.Address!=null)
                {
                    existing.Address.AddressLine1 = model.AddressLine1;
                    existing.Address.AddressLine2 = model.AddressLine2;
                    existing.Address.City = model.City;
                    existing.Address.StateId = model.StateId;
                }
                else
                {
                    existing.Address = new Address
                    {
                        AddressLine1 = model.AddressLine1,
                        AddressLine2 = model.AddressLine2,
                        City = model.City,
                        StateId = model.StateId
                    };
                }
                _db.Patients.Update(existing);
            }
            else
            {
                existing = new Patient
                {
                    Name = model.Name,
                    DateOfBirth = model.DateOfBirth,
                    GenderId = model.GenderId,
                    Address = new Address
                    {
                        AddressLine1 = model.AddressLine1,
                        AddressLine2 = model.AddressLine2,
                        City = model.City,
                        StateId = model.StateId
                    }
                };
                _db.Patients.Add(existing);
            }
            await _db.SaveChangesAsync();
            var lst = await DoGetPatients();
            return lst;
        }

        // GET: api/Patient/DeletePatient/5
        [HttpDelete("{id}")]
        [Route("[action]")]
        public async Task<IEnumerable<PatientModel>> DeletePatient(int id)
        {
            Patient existing = _db.Patients.FirstOrDefault(x => x.Id == id);
            if(existing!=null)
            {
                _db.Patients.Remove(existing);
                await _db.SaveChangesAsync();
            }
            var lst = await DoGetPatients();
            return lst;
        }

        // GET: api/Patient/DeletePatient/5
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<PatientModel> Details(int id)
        {
            Patient x = await Task.FromResult(_db.Patients.Include(x => x.Address.State.Country).Include(x => x.Gender).FirstOrDefault(x=>x.Id==id));

            if (x == null) return null;
            return new PatientModel
            {
                Id = x.Id,
                Name = x.Name,
                DateOfBirth = x.DateOfBirth,
                AddressLine1 = x.Address?.AddressLine1,
                AddressLine2 = x.Address?.AddressLine2,
                City = x.Address?.City,
                StateId = x.Address.StateId,
                GenderId = x.GenderId,
                CountryId = x.Address?.State?.CountryId,
                CountryName = x.Address?.State?.Country?.Description,
                GenderName = x.Gender?.Description,
                StateName = x.Address?.State?.Description
            };
            
        }

        // GET: api/Patient/GetCountryList
        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Country> GetCountryList()
        {
            return _db.Countries.ToList(); 
        }

        // GET: api/Patient/GetStateList
        [HttpGet]
        [Route("[action]")]
        public IEnumerable<State> GetStateList()
        {
            return _db.States?.ToList();
        }

        private async Task<List<PatientModel>> DoGetPatients()
        {
            var lst = await Task.FromResult(_db.Patients.Include(x=>x.Address.State.Country).Include(x=>x.Gender).ToList());
            List<PatientModel> uiData = new List<PatientModel>();

            if (lst?.Any() ?? false)
            {
                uiData = lst.Select(x => new PatientModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    DateOfBirth = x.DateOfBirth,
                    AddressLine1 = x.Address?.AddressLine1,
                    AddressLine2 = x.Address?.AddressLine2,
                    City = x.Address?.City,
                    StateId = x.Address.StateId,
                    GenderId = x.GenderId,
                    CountryId = x.Address?.State?.CountryId,
                    CountryName = x.Address?.State?.Country?.Description,
                    GenderName = x.Gender?.Description,
                    StateName = x.Address?.State?.Description
                }).ToList();
            }
            return uiData;
        }
    }
}

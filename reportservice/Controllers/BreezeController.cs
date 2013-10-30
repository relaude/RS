using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.WebApi;
using HotTowel.Models;
using Newtonsoft.Json.Linq;

namespace HotTowel.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController
    {
        readonly EFContextProvider<MyDBContext> _contextProvider =
            new EFContextProvider<MyDBContext>();


        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IQueryable<Employees> GetEmployees()
        {
            return _contextProvider.Context.Employees;
        }

        [HttpGet]
        public IQueryable<Employees> Employees()
        {
            return _contextProvider.Context.Employees;
        }
    }
}

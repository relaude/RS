using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.WebApi;
using LinqClasses;
using Model.Northwind;
using System.Configuration;
using DAL;
using Model.ReportService;

namespace reportservice.Controllers
{
    [BreezeController]
    public class ReportController : ApiController
    {
        readonly EFContextProvider<ReportServiceContext> _context = new EFContextProvider<ReportServiceContext>();
        readonly Services.ReportService _rptSrv = new Services.ReportService();
        readonly Services.UserAccount _userAccnt = new Services.UserAccount();

        [HttpGet]
        public string MetaData()
        {
            return _context.Metadata();
        }

        [HttpGet]
        public IQueryable<UserProfile> UserProfiles()
        {
            return _userAccnt.UserRepo.All;
        }

        [HttpGet]
        public IQueryable<Orders> Orders()
        {
            return _rptSrv.OrderRepo.All;
        }

    }
}

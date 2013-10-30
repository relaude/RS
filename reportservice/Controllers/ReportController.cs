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
using Services.ReportService;

namespace reportservice.Controllers
{
    [BreezeController]
    public class ReportController : ApiController
    {
        //readonly BreezeMetadata _metaData = new BreezeMetadata();

        readonly EFContextProvider<ReportServiceContext> _context = new EFContextProvider<ReportServiceContext>();
        readonly OrdersAccessor _ordAccess = new OrdersAccessor();

        [HttpGet]
        public string MetaData()
        {
            return _context.Metadata();
        }

        [HttpGet]
        public IQueryable<Orders> Orders()
        {
            return _ordAccess.Repo.All;
        }

    }
}

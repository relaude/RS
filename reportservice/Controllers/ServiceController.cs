using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Services.ReportService;

namespace reportservice.Controllers
{
    public class ServiceController : Controller
    {   
        public ActionResult Index()
        {
            return View(); 
        }

    }
}

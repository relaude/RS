using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace reportservice.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //WebMatrix.WebData.WebSecurity.Initialized
            return View(); 
        }
    }
}

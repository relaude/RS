using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace reportservice.Controllers
{
    public class ReportServiceController : Controller
    {
        public ActionResult index()
        {
            return PartialView();
        }

        public ActionResult shell()
        {
            return PartialView();
        }

        public ActionResult twitter_nav()
        {
            return PartialView();
        }

        public ActionResult twitter_footer()
        {
            return PartialView();
        }

        public ActionResult home()
        {
            return PartialView();
        }

        public ActionResult orders()
        {
            return PartialView();
        }

        public ActionResult login()
        {
            return PartialView();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using reportservice.DependencyResolution;
using System.Web.Http;
using StructureMap;

[assembly: WebActivator.PreApplicationStartMethod(typeof(reportservice.App_Start.StructuremapMvc), "Start")]

namespace reportservice.App_Start
{
    public static class StructuremapMvc
    {
        public static void Start()
        {
            IContainer container = IoC.Initialize();
            DependencyResolver.SetResolver(new StructureMapDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new StructureMapDependencyResolver(container);
        }
    }
}
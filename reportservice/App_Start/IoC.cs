using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using StructureMap;

namespace reportservice.App_Start
{
    public static class IoC
    {
        public static IContainer Initialize()
        {
            ObjectFactory.Initialize(x =>
            {
                x.Scan(scan =>
                {
                    scan.TheCallingAssembly();
                    scan.WithDefaultConventions();
                });
                x.For<Repository.IUnitOfWork>().Use<Services.UnitOfWork<DAL.UsersAccountContext>>();
            });
            return ObjectFactory.Container;
        }
    }
}
using System;
using System.Web.Optimization;
using reportservice;

[assembly: WebActivator.PostApplicationStartMethod(
    typeof(reportservice.App_Start.HotTowelConfig), "PreStart")]

namespace reportservice.App_Start
{
    public static class HotTowelConfig
    {
        public static void PreStart()
        {
            // Add your start logic here
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
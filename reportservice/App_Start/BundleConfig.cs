using System.Web;
using System.Web.Optimization;

namespace reportservice
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            //hot towel template
            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/scripts/jquery-{version}.js")
                .Include("~/scripts/jquery.dataTables.js")
                .Include("~/scripts/knockout-{version}.debug.js")
                .Include("~/scripts/sammy-{version}.js")
                .Include("~/scripts/toastr.js")
                .Include("~/scripts/Q.js")
                .Include("~/scripts/breeze.debug.js")
                .Include("~/scripts/bootstrap.js")
                .Include("~/scripts/moment.js")
                .Include("~/scripts/bootstrap-datatable.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/twitter")
                .Include("~/Content/twitter/bootstrap.css")
                .Include("~/Content/twitter/bootstrap-theme.css")
                .Include("~/Content/twitter/datepicker.css")
                .Include("~/Content/twitter/datatablestyle.css")
                .Include("~/Content/twitter/app.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/ie10mobile.css")
              );

            //report service mvc
            bundles.Add(
              new ScriptBundle("~/scripts/rservice")
                .Include("~/scripts/jquery-{version}.js")
                .Include("~/scripts/jquery-ui-{version}.js")
                .Include("~/scripts/knockout-{version}.debug.js")
                .Include("~/scripts/jquery.dataTables.js")
                .Include("~/scripts/bootstrap.js")
                .Include("~/scripts/bootstrap-datepicker.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/rservice")
                .Include("~/Content/twitter/bootstrap.css")
                .Include("~/Content/twitter/bootstrap-theme.css")
                .Include("~/Content/twitter/bootstrap-theme.css")
                .Include("~/Content/twitter/datepicker.css")
                .Include("~/Content/themes/base/jquery-ui.css")
                .Include("~/Content/twitter/app.css")
              );
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication1
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute(
				name: "wizard",
				url: "wizard/register/",
				defaults: new { controller = "Wizard", action = "Register" }
			);

			routes.MapRoute(
				name: "wizardDefault",
				url: "wizard/register/{*catchall}",
				defaults: new { controller = "Wizard", action = "Register" }
			);

			routes.MapMvcAttributeRoutes();

			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{id}",
				defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
			);
		}
	}
}

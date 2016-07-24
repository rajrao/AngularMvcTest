using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Api
{
	[RoutePrefix("api/wizard")]
	public class WizardController : ApiController
	{
		[HttpPost]
		[Route("register/validate")]
		public HttpResponseMessage Validate(HttpRequestMessage httpRequestMessage, [FromBody] WizardData data)
		{
			HttpResponseMessage response = null;
			if (data != null)
			{
				response = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
			}
			else
			{
				response = httpRequestMessage.CreateErrorResponse(HttpStatusCode.BadRequest, "Error Dude!");
			}
			return response;
		}

		[HttpPost]
		[Route("register/complete")]
		public HttpResponseMessage Register(HttpRequestMessage httpRequestMessage, [FromBody] WizardData data)
		{
			HttpResponseMessage response = null;
			if (data != null)
			{
				response = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
			}
			else
			{
				response = httpRequestMessage.CreateErrorResponse(HttpStatusCode.BadRequest, "Error Dude!");
			}
			return response;
		}
	}
}
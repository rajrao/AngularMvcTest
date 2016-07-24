using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Api
{
	[RoutePrefix("api/myTestData")]
	public class MyTestDataController : ApiController
	{
		[HttpPost]
		[Route("DoSomeWork")]
		public HttpResponseMessage DoWork(HttpRequestMessage httpRequestMessage, [FromBody] TestData testData)
		{
			HttpResponseMessage response = null;
			if (testData != null && testData.MyName.Contains(" "))
			{
				response = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
			}
			else
			{
				response = httpRequestMessage.CreateErrorResponse(HttpStatusCode.BadRequest,"MyName should have a first and last name");
			}
			return response;
		}

		// GET api/<controller>
		public IEnumerable<string> Get()
		{
			return new string[] { "value1", "value2" };
		}

		// GET api/<controller>/5
		public string Get(int id)
		{
			return "value";
		}

		// POST api/<controller>
		public void Post([FromBody]string value)
		{
		}

		// PUT api/<controller>/5
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/<controller>/5
		public void Delete(int id)
		{
		}
	
	}
}
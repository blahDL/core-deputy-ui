using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeputyUI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeputyUI.Controllers
{
    [Produces("application/json")]
    [Route("api/authorisation")]
    public class AuthorisationController : Controller
    {
        private readonly IDeputyApiService service;

        public AuthorisationController(IDeputyApiService service)
        {
            this.service = service;
        }

        [HttpGet("config")]
        public DeputyConfig Config()
        {
            return service.Config;
        }

        [HttpGet("accesstoken/{authCode}")]
        public async Task<object> AccessToken(string authCode)
        {
            return await service.AccessToken(authCode, $"{Request.Scheme}://{Request.Host.Value}/");
        }
    }
}
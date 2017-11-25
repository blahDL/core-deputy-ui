using DeputyUI.Models;
using DeputyUI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeputyUI.Controllers
{
    [Produces("application/json")]
    [Route("api/deputy")]
    public class DeputyController : Controller
    {
        private readonly IDeputyApiService service;

        public DeputyController(IDeputyApiService service)
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

        [HttpPost("rosters")]
        public async Task<IEnumerable<IEnumerable<IGrouping<int?, RosterResponse>>>> Rosters([FromBody] RosterRequest request)
        {
            return (await service.Rosters(request)).GroupBy(a => a.OperationalUnit).Select(b => b.GroupBy(c => c.Employee));
        }

        [HttpPost("leave")]
        public async Task<IEnumerable<LeaveResponse>> Leave([FromBody] LeaveRequest request)
        {
            return await service.Leave(request);
        }

    }
}
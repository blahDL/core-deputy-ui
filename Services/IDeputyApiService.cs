using DeputyUI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DeputyUI.Services
{
    public interface IDeputyApiService
    {
        DeputyConfig Config { get; }
        Task<AccessTokenResponse> AccessToken(string authCode, string redirectUri);
        Task<IEnumerable<RosterResponse>> Rosters(AccessTokenResponse accessToken, RosterRequest request);
        Task<IEnumerable<LeaveResponse>> Leave(AccessTokenResponse accessToken, LeaveRequest request);
    }
}

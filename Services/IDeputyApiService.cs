using DeputyUI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DeputyUI.Services
{
    public interface IDeputyApiService
    {
        Task<IEnumerable<RosterResponse>> Rosters(RosterRequest request);
        Task<IEnumerable<LeaveResponse>> Leave(LeaveRequest request);
    }
}

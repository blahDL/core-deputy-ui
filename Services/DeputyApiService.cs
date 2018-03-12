using DeputyUI.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DeputyUI.Services
{
    public class DeputyApiService : IDeputyApiService
    {
        public DeputyConfig Config { get; private set; }

        public DeputyApiService(DeputyConfig config)
        {
            Config = config;
        }

        public async Task<AccessTokenResponse> AccessToken(string authCode, string redirectUri)
        {
            var request = new AccessTokenRequest
            {
                ClientId = Config.ClientId,
                ClientSecret = Config.ClientSecret,
                Code = authCode,
                RedirectUri = redirectUri
            };

            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var json = JsonConvert.SerializeObject(request);
            var form = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            var content = new FormUrlEncodedContent(form); //  new StringContent(json, Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("https://once.deputy.com/my/oauth/access_token", content);
            string value = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<AccessTokenResponse>(value);

            return result;
        }

        public async Task<IEnumerable<RosterResponse>> Rosters(AccessTokenResponse accessToken, RosterRequest request)
        {
            ResourceRequest resourceRequest = new ResourceRequest();
            resourceRequest.Search.Add("employee", new SearchField { Field = "Employee", Data = 0, Type = SearchType.ne });
            resourceRequest.Sort.Add("OperationalUnit", SortDirection.asc);
            resourceRequest.Sort.Add("Employee", SortDirection.asc);
            resourceRequest.Start = 0;

            if (!string.IsNullOrWhiteSpace(request.StartDate))
                resourceRequest.Search.Add("StartDate", new SearchField { Field = "Date", Data = request.StartDate, Type = SearchType.ge });
            if (!string.IsNullOrWhiteSpace(request.EndDate))
                resourceRequest.Search.Add("EndDate", new SearchField { Field = "Date", Data = request.EndDate, Type = SearchType.le });

            return await Resources<RosterResponse>(accessToken, "Roster", resourceRequest);
        }

        public async Task<IEnumerable<LeaveResponse>> Leave(AccessTokenResponse accessToken, LeaveRequest request)
        {
            ResourceRequest resourceRequest = new ResourceRequest();
            resourceRequest.Search.Add("awaitingApproval", new SearchField { Field = "Status", Data = 0, Type = SearchType.ge });
            resourceRequest.Search.Add("approved", new SearchField { Field = "Status", Data = 1, Type = SearchType.le });
            resourceRequest.Sort.Add("Employee", SortDirection.asc);
            resourceRequest.Start = 0;

            if (!string.IsNullOrWhiteSpace(request.StartDate))
                resourceRequest.Search.Add("StartDate", new SearchField { Field = "DateEnd", Data = request.StartDate, Type = SearchType.ge });
            if (!string.IsNullOrWhiteSpace(request.EndDate))
                resourceRequest.Search.Add("EndDate", new SearchField { Field = "DateStart", Data = request.EndDate, Type = SearchType.le });

            return await Resources<LeaveResponse>(accessToken, "Leave", resourceRequest);
        }

        private async Task<IEnumerable<T>> Resources<T>(AccessTokenResponse accessToken, string resourceName, ResourceRequest request)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("OAuth", accessToken.AccessToken);

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync($"https://{accessToken.Endpoint}/api/v1/resource/{resourceName}/QUERY", content);
            string value = await response.Content.ReadAsStringAsync();
            IEnumerable<T> result = JsonConvert.DeserializeObject<IEnumerable<T>>(value);

            if (result.Count() == 500)
            {
                request.Start += 500;
                return result.Concat(await Resources<T>(accessToken, resourceName, request));
            }

            return result;
        }
    }
}

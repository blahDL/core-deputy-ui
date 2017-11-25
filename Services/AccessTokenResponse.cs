using Newtonsoft.Json;

namespace DeputyUI.Services
{
    public class AccessTokenResponse : DeputyError
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
        public string Scope { get; set; }
        public string Endpoint { get; set; }
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
    }
}

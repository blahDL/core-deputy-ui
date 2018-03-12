using Newtonsoft.Json;

namespace DeputyUI.Models
{
    public class AccessTokenRequest
    {
        [JsonProperty("client_id")]
        public string ClientId {get;set;}
        [JsonProperty("client_secret")]
        public string ClientSecret { get; set; }
        [JsonProperty("redirect_uri")]
        public string RedirectUri { get; set; }
        [JsonProperty("grant_type")]
        public string GrantType { get; set; } = "authorization_code";
        [JsonProperty("code")]
        public string Code { get; set; }
        [JsonProperty("scope")]
        public string Scope { get; set; } = "longlife_refresh_token";
    }
}

using Newtonsoft.Json;
using System;

namespace DeputyUI
{
    public class DeputyConfig
    {
        public string ClientId { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_CLIENT");
        [JsonIgnore]
        internal string ClientSecret { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_SECRET");
        // public string ApiKey { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_KEY");
        // public string ApiHost { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_HOST");
    }
}

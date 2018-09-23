using Newtonsoft.Json;
using System;

namespace DeputyUI
{
    public class DeputyConfig
    {
        public string ClientId { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_CLIENT");
        internal string ClientSecret { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_SECRET");
        internal string ApiKey { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_KEY");
        internal string ApiHost { get; set; } = Environment.GetEnvironmentVariable("DEPUTY_API_HOST");
    }
}

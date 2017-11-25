using Newtonsoft.Json;

namespace DeputyUI.Services
{
    public class DeputyError
    {
        [JsonProperty("error")]
        public string Error { get; set; }
        [JsonProperty("error_description")]
        public string Description { get; set; }
    }
}

using Newtonsoft.Json;

namespace DeputyUI.Services
{
    public class SearchField
    {
        [JsonProperty("field")]
        public string Field { get; set; }
        [JsonProperty("data")]
        public object Data { get; set; }
        [JsonProperty("type")]
        public SearchType Type { get; set; }
    }
}
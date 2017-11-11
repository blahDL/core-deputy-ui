using DeputyUI.Services;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DeputyUI.Models
{
    public class ResourceRequest
    {
        [JsonProperty("search")]
        public Dictionary<string, SearchField> Search { get; set; } = new Dictionary<string, SearchField>();
        [JsonProperty("sort")]
        public Dictionary<string, SortDirection> Sort { get; set; } = new Dictionary<string, SortDirection>();
        [JsonProperty("start")]
        public int Start { get; set; }
    }
}
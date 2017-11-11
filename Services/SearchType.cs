using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace DeputyUI.Services
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum SearchType
    {
        gt, ge, eq, lt, le, ne
    }
}
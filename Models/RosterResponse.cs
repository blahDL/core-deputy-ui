using DeputyUI.Services;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace DeputyUI.Models
{
    public class RosterResponse : DeputyError
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        [Required]
        public int StartTime { get; set; }
        public string StartTimeLocalized { get; set; }
        [Required]
        public int EndTime { get; set; }
        public string EndTimeLocalized { get; set; }
        TimeSpan Mealbreak { get; set; }
        public float? TotalTime { get; set; }
        public float? Cost { get; set; }
        public int? OperationalUnit { get; set; }
        public int? Employee { get; set; }
        public string Comment { get; set; }
        public string Warning { get; set; }
        public string WarningOverrideComment { get; set; }
        public bool Published { get; set; }
        public int? MatchedByTimesheet { get; set; }
        public bool Open { get; set; }
        public int? ConfirmStatus { get; set; }
        public string ConfirmComment { get; set; }
        public int? ConfirmBy { get; set; }
        public int? ConfirmTime { get; set; }
        public int? SwapStatus { get; set; }
        public int? SwapManageBy { get; set; }
        public int? Creator { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public RosterMetaData _DPMetaData { get; set; }
    }
}

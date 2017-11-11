using System;
using System.ComponentModel.DataAnnotations;

namespace DeputyUI.Models
{
    public class LeaveResponse
    {
        public int Id { get; set; }
        [Required]
        public int Employee { get; set; }
        [Required]
        public int EmployeeHistory { get; set; }
        [Required]
        public int Company { get; set; }
        [Required]
        public int Start { get; set; }
        public DateTime? DateStart { get; set; }
        [Required]
        public int End { get; set; }
        public DateTime? DateEnd { get; set; }
        public float? Days { get; set; }
        public int? ApproverTime { get; set; }
        public int? ApproverPay { get; set; }
        public string Comment { get; set; }
        [Required]
        public LeaveStatus Status { get; set; }
        public string ApprovalComment { get; set; }
        public float? TotalHours { get; set; }
        public int? Creator { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}

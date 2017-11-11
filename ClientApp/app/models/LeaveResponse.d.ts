import { LeaveStatus } from './LeaveStatus';
// module DeputyUi {
    
	// DeputyUI.Models.LeaveResponse
    export interface LeaveResponse {
        
        // Id
        public id: number;
        // Employee
        public employee: number;
        // EmployeeHistory
        public employeeHistory: number;
        // Company
        public company: number;
        // Start
        public start: number;
        // DateStart
        public dateStart: Date;
        // End
        public end: number;
        // DateEnd
        public dateEnd: Date;
        // Days
        public days: number;
        // ApproverTime
        public approverTime: number;
        // ApproverPay
        public approverPay: number;
        // Comment
        public comment: string;
        // Status
        public status: LeaveStatus;
        // ApprovalComment
        public approvalComment: string;
        // TotalHours
        public totalHours: number;
        // Creator
        public creator: number;
        // Created
        public created: Date;
        // Modified
        public modified: Date;
    }
// }
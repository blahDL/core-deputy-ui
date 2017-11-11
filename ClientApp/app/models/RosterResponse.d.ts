import { RosterMetaData } from './RosterMetaData';
// module DeputyUi {
    
	// DeputyUI.Models.RosterResponse
    export interface RosterResponse {
        
        // Id
        public id: number;
        // Date
        public date: Date;
        // StartTime
        public startTime: number;
        // StartTimeLocalized
        public startTimeLocalized: string;
        // EndTime
        public endTime: number;
        // EndTimeLocalized
        public endTimeLocalized: string;
        // TotalTime
        public totalTime: number;
        // Cost
        public cost: number;
        // OperationalUnit
        public operationalUnit: number;
        // Employee
        public employee: number;
        // Comment
        public comment: string;
        // Warning
        public warning: string;
        // WarningOverrideComment
        public warningOverrideComment: string;
        // Published
        public published: boolean;
        // MatchedByTimesheet
        public matchedByTimesheet: number;
        // Open
        public open: boolean;
        // ConfirmStatus
        public confirmStatus: number;
        // ConfirmComment
        public confirmComment: string;
        // ConfirmBy
        public confirmBy: number;
        // ConfirmTime
        public confirmTime: number;
        // SwapStatus
        public swapStatus: number;
        // SwapManageBy
        public swapManageBy: number;
        // Creator
        public creator: number;
        // Created
        public created: Date;
        // Modified
        public modified: Date;
        // _DPMetaData
        public _DPMetaData: RosterMetaData;
    }
// }
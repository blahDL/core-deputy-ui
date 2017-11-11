import { CreatorInfo } from './CreatorInfo';
import { OperationalUnitInfo } from './OperationalUnitInfo';
import { EmployeeInfo } from './EmployeeInfo';
// module DeputyUi {
    
	// DeputyUI.Models.RosterMetaData
    export interface RosterMetaData {
        
        // System
        public system: string;
        // CreatorInfo
        public creatorInfo: CreatorInfo;
        // OperationalUnitInfo
        public operationalUnitInfo: OperationalUnitInfo;
        // EmployeeInfo
        public employeeInfo: EmployeeInfo;
    }
// }
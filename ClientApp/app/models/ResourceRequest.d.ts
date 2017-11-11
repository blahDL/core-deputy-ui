import { SearchField } from './SearchField';
import { SortDirection } from './SortDirection';
// module DeputyUi {
    
	// DeputyUI.Models.ResourceRequest
    export interface ResourceRequest {
        
        // Search
        public search: { [key: string]: SearchField; };
        // Sort
        public sort: { [key: string]: SortDirection; };
        // Start
        public start: number;
    }
// }
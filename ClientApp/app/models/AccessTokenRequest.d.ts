
// module DeputyUi {
    
	// DeputyUI.Models.AccessTokenRequest
    export interface AccessTokenRequest {
        
        // ClientId
        public client_id: string;
        // ClientSecret
        public client_secret: string;
        // RedirectUri
        public redirect_uri: string;
        // GrantType
        public grant_type: string;
        // Code
        public code: string;
        // Scope
        public scope: string;
    }
// }
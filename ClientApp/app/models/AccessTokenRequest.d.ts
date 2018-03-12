
// module DeputyUi {
    
	// DeputyUI.Models.AccessTokenRequest
    export interface AccessTokenRequest {
        
        // ClientId
        public clientId: string;
        // ClientSecret
        public clientSecret: string;
        // RedirectUri
        public redirectUri: string;
        // GrantType
        public grantType: string;
        // Code
        public code: string;
        // Scope
        public scope: string;
    }
// }
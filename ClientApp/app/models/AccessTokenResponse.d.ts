
// module DeputyUi {
    
	// DeputyUI.Models.AccessTokenResponse
    export interface AccessTokenResponse {
        
        // AccessToken
        public access_token: string;
        // ExpiresIn
        public expires_in: number;
        // Scope
        public scope: string;
        // Endpoint
        public endpoint: string;
        // RefreshToken
        public refresh_token: string;
        
        // Error
        public error: string;
        // ErrorDescription
        public error_description: string;
    }
// }
export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	authToken: string;
	refreshToken: string;
	timeStamp: string;
}

export interface AuthPayload {
	message: 'SUCCESS' | string;
	data: any | null;	
}

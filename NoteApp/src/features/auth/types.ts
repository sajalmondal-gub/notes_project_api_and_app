import { ApiResponse } from "../../types";

export interface LoginRequestPayload {
    email: string,
    password: string,
}

export interface AuthTokenData {
    token: string,
    refreshToken: string,
    user: {
        id: string;
        email: string;
        fullName: string;
    };
}

export type AuthResponse = ApiResponse<AuthTokenData>;
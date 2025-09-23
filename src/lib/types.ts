export interface ApiResponse {
  message?: string;
  messages?: SignUpReq;
}

/**
 * Sign Up Request
 */
export interface SignUpReq {
  username: string;
  fullname: string;
  password: string;
  confirm_password: string;
}

/**
 * Sign In Request and Response
 */
export interface SignInReq {
  username: string;
  password: string;
}

export interface SignInRes {
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

/**
 * Refresh Token Request and Response
 */
export interface RefreshTokenReq {
  refreshToken: string;
}

export interface RefreshTokenRes {
  message?: string;
  data?: { accessToken: string };
}

/**
 * Validate Access Token Request and Response
 */
export interface ValidateAccessTokenReq {
  accessToken: string;
}

export interface ValidateAccessTokenRes {
  message: string;
  data: { is_valid: boolean };
}

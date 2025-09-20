export interface ApiResponse {
  message?: string;
  messages?: SignUpReq;
}

/**
 * Sign Up Request
 * */
export interface SignUpReq {
  username: string;
  fullname: string;
  password: string;
  confirm_password: string;
}

/**
 * Sign In Request and Response
 * */
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

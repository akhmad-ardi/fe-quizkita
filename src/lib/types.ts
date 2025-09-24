export interface ApiResponse {
  message?: string;
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
    token: string;
  };
}

/**
 * Validate Token Request and Response
 */

export interface ValidatTokenRes {
  message: string;
  is_auth: boolean;
}

/**
 * Add Class Request and Response
 */
export interface AddClassReq {
  name: string;
}

export interface AddClassRes extends ApiResponse {
  class_id: string;
  messages: {
    name: string;
  };
}

/**
 * Join Class Request and Response
 */
export interface JoinClassReq {
  inviteCode: string;
}

/**
 * Add User to Class Request and Response
 */
export interface AddUserToClassReq {
  username: string;
  classId: string;
}

/**
 * Get Class Response
 */
export interface GetClassesRes extends ApiResponse {
  data: {
    classes: [
      {
        id: string;
        name: string;
        total_quiz: number;
        created_at: string;
      },
    ];
  };
}

/**
 * Delete Class Request and Response
 */
export interface DeleteClassReq {
  classId: string;
}

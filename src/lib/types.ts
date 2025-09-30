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

export interface SignUpRes extends ApiResponse {
  messages: SignUpReq;
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
 * Get User Request and Response
 */
export interface User {
  id: string;
  username: string;
  fullname: string;
}

export interface GetUserRes extends ApiResponse {
  data: { user: User };
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
  invite_code: string;
}

export interface JoinClassRes extends ApiResponse {
  messages: JoinClassReq;
}

/**
 * Add User to Class Request and Response
 */
export interface AddUserToClassReq {
  username: string;
  classId: string;
}

export interface AddUserToClassRes extends ApiResponse {
  messages: AddUserToClassReq;
}

/**
 * Get Classes Response
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
 * Add Material Request and Response
 */
export interface AddMaterialReq {
  class_id: string;
  title: string;
  content: string;
}

export interface AddMaterialRes extends ApiResponse {
  messages?: AddMaterialReq;
}

/**
 * Get Materials Response
 */
export interface GetMaterialsRes extends ApiResponse {
  data: {
    class_id: string;
    user_id: string;
    class_name: string;
    materials: Array<{
      id: string;
      title: string;
      total_questions: number;
      created_at: string;
    }>;
  };
}

/**
 * Get Material Response
 */
export interface GetMaterialRes extends ApiResponse {
  data: {
    material_id: string;
    title: string;
    content: string;
    questions: Array<{
      id: string;
      question_text: string;
      Answers: Array<{
        id: string;
        question_id: string;
        answer_text: string;
      }>;
    }>;
  };
}

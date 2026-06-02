export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}
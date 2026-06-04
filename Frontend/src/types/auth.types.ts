export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;

  user: {
    id: number;
    username: string;
    role: string;
  };
}
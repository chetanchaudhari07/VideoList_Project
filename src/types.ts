export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  tags: string[];
  user: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
}
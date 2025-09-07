export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  ownerUid: string;
  createdAt: Date;
}

export interface CreateClientRequest {
  name: string;
  phone: string;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  displayName?: string;
}

export interface UpdateUserRequest {
  displayName?: string;
}

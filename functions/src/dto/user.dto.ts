export interface CreateUserProfileDto {
  uid: string;
  email: string;
  displayName?: string;
}

export interface UpdateUserProfileDto {
  uid: string;
  displayName?: string;
}

export interface GetUserProfileDto {
  uid: string;
}

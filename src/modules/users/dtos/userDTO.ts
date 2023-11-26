
export interface UserDTO {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isDeleted?: boolean;
}
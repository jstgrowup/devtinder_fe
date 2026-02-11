export interface CommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface IUser {
  firstName: string;
  lastName?: string;
  emailId: string;
  password: string;
  age?: number;
  gender?: "male" | "female" | "others";
  about: string;
  photoUrl: string;
  skills: string[];
}

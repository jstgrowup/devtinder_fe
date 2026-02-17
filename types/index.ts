export interface CommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface BaseResponse {
  success: boolean;
  message: string;
}

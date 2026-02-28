export interface CommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface CommonResponseNew<T> {
  status: COMMON_STATUS;
  data: { message: string; data: T };
}
export interface CommonReqBody<T> {
  namespace: NAMESPACES;
  apiName: string;
  data: T;
}
export interface BaseResponse {
  success: boolean;
  message: string;
}
export interface PaginatedQuery {
  page?: number;
  limit?: number;
}
export enum COMMON_STATUS {
  OK = "ok",
  ERROR = "error",
}
export enum NAMESPACES {
  AUTH = "auth",
  USER = "user",
}

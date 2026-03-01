export interface CommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface ClientResponse<T> {
  message: string;
  data: T;
}
export interface CommonResponseNew<T> {
  status: COMMON_RESPONSE_STATUS;
  data: ClientResponse<T>;
}
export interface CommonReqBody<T> {
  namespace: NAMESPACES;
  apiName: string;
  data: T;
}
export interface BaseResponse {
  message: string;
}
export interface PaginatedQuery {
  page?: number;
  limit?: number;
}
export enum COMMON_RESPONSE_STATUS {
  OK = "ok",
  ERROR = "error",
}
export enum NAMESPACES {
  AUTH = "auth",
  PROFILE = "profile",
  USER = "user",
  REQUESTS = "requests",
}

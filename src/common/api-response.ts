import { ApiResponse } from './dto/response.dto';

export const apiSuccess = (
  statusCode: number = 200,
  data: any = null,
  message: string,
): ApiResponse => {
  return { statusCode, data, message };
};

export const apiFailed = (
  statusCode: number = 500,
  data: any = null,
  message: string = 'Internal server error',
): ApiResponse => {
  return { statusCode, data, message };
};

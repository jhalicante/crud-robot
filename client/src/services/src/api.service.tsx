import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../config';
import { APIResponse } from '../../models';

export const POST = async (endPoint: string, body: any): Promise<APIResponse> => {
  let response: AxiosResponse = await axios.post(`${BASE_URL}${endPoint}`, body);
  return response.data;
};

export const GET = async (endPoint: string): Promise<APIResponse> => {
  let response: AxiosResponse = await axios.get(`${BASE_URL}${endPoint}`);
  return response.data;
};

export const PATCH = async (endPoint: string, body: any): Promise<APIResponse> => {
  let response: AxiosResponse = await axios.patch(`${BASE_URL}${endPoint}`, body);
  return response.data;
};

export const DELETE = async (endPoint: string): Promise<APIResponse> => {
  let response: AxiosResponse = await axios.delete(`${BASE_URL}${endPoint}`);
  return response.data;
};

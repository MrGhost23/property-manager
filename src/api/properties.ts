import apiClient from './axios';
import { Property } from '../types';

export const getProperties = async (): Promise<Property[]> => {
  const response = await apiClient.get<Property[]>('/properties');
  return response.data;
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await apiClient.get<Property>(`/properties/${id}`);
  return response.data;
};
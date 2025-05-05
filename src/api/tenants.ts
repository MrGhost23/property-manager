import apiClient from './axios';
import { Tenant } from '@/types';

export const getTenantsByPropertyId = async (propertyId: string): Promise<Tenant[]> => {
  const response = await apiClient.get<Tenant[]>(`/tenants?propertyId=${propertyId}`);
  return response.data;
};

export const getTenantById = async (id: string): Promise<Tenant> => {
  const response = await apiClient.get<Tenant>(`/tenants/${id}`);
  return response.data;
};
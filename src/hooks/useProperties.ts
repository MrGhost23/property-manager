import { useQuery } from '@tanstack/react-query';
import { getProperties, getPropertyById } from '../api/properties';

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
};
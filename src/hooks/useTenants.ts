import { getTenantById, getTenantsByPropertyId } from "@/api/tenants";
import { useQuery } from "@tanstack/react-query";

export const useTenantsByPropertyId = (propertyId: string) => {
    return useQuery({
      queryKey: ['tenants', propertyId],
      queryFn: () => getTenantsByPropertyId(propertyId),
      enabled: !!propertyId,
    });
};


export const useTenant = (id: string) => {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: () => getTenantById(id),
    enabled: !!id,
  });
};
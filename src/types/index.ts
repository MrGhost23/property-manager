export interface Property {
    id: string;
    name: string;
    address: string;
    tenantCount: number;
    rentDue: number;
}
  
export interface Tenant {
    id: string;
    propertyId: string;
    name: string;
    leaseStart: string;
    leaseEnd: string;
    rentAmount: number;
    paymentStatus: 'Paid' | 'Unpaid';
}
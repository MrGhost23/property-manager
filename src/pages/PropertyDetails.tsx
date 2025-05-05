import { useProperty } from "@/hooks/useProperties";
import { useTenantsByPropertyId } from "@/hooks/useTenants";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetails = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();

  const {
    data: property,
    isLoading: isPropertyLoading,
    error: propertyError,
  } = useProperty(propertyId || "");

  const {
    data: tenants,
    isLoading: isTenantsLoading,
    error: tenantsError,
  } = useTenantsByPropertyId(propertyId || "");

  useEffect(() => {
    if (propertyError) {
      toast.error("Failed to load property details");
    }

    if (tenantsError) {
      toast.error("Failed to load tenant information");
    }
  }, [propertyError, tenantsError]);

  const isLoading = isPropertyLoading || isTenantsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[100px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Property not found</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="flex items-center text-muted-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="text-muted-foreground">{property.address}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Property Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Tenants
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {property.tenantCount}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Rent Due
            </p>
            <p
              className={`text-2xl font-bold ${
                property.rentDue > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              ${property.rentDue}
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          {tenants && tenants.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant Name</TableHead>
                  <TableHead>Lease Period</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">{tenant.name}</TableCell>
                    <TableCell>
                      {tenant.leaseStart} to {tenant.leaseEnd}
                    </TableCell>
                    <TableCell>${tenant.rentAmount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tenant.paymentStatus === "Paid"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {tenant.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/property/${property.id}/tenant/${tenant.id}`
                          )
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No tenants found for this property.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetails;

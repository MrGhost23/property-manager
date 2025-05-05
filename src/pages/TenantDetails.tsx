import { useProperty } from "@/hooks/useProperties";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";
import { useTenant } from "@/hooks/useTenants";

const TenantDetails = () => {
  const { tenantId, propertyId } = useParams<{
    tenantId: string;
    propertyId: string;
  }>();
  const navigate = useNavigate();

  const {
    data: tenant,
    isLoading: isTenantLoading,
    error: tenantError,
  } = useTenant(tenantId || "");

  const {
    data: property,
    isLoading: isPropertyLoading,
    error: propertyError,
  } = useProperty(propertyId || "");

  useEffect(() => {
    if (tenantError) {
      toast.error("Failed to load tenant details");
    }

    if (propertyError) {
      toast.error("Failed to load property information");
    }
  }, [tenantError, propertyError]);

  const isLoading = isTenantLoading || isPropertyLoading;

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

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
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[180px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tenant || !property) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Tenant not found</h2>
        <Button onClick={() => navigate(`/property/${propertyId}`)}>
          Return to Property
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="flex items-center text-muted-foreground"
          onClick={() => navigate(`/property/${propertyId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {property.name}
        </Button>
        <h1 className="text-3xl font-bold">{tenant.name}</h1>
        <p className="text-muted-foreground">Tenant at {property.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Full Name
              </h3>
              <p className="text-base">{tenant.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <div className="mt-1">
                <Badge
                  variant={
                    tenant.paymentStatus === "Paid" ? "success" : "destructive"
                  }
                >
                  {tenant.paymentStatus}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Property
              </h3>
              <p className="text-base">{property.name}</p>
              <p className="text-sm text-muted-foreground">
                {property.address}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lease Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Start Date
                </h3>
                <p className="text-base">{formatDate(tenant.leaseStart)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  End Date
                </h3>
                <p className="text-base">{formatDate(tenant.leaseEnd)}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Monthly Rent
              </h3>
              <p className="text-xl font-bold">${tenant.rentAmount}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={tenant.paymentStatus === "Paid" ? "outline" : "default"}
              disabled={tenant.paymentStatus === "Paid"}
            >
              {tenant.paymentStatus === "Paid"
                ? "Payment Received"
                : "Record Payment"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No payment history available.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDetails;

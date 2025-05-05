import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProperties } from "@/hooks/useProperties";
import { Property } from "@/types";
import { FilterIcon, LayoutGrid, Plus, TableIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const Dashboard = () => {
  const [isTable, setIsTable] = useState<boolean>(false);

  const { data: properties, isLoading, error } = useProperties();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load properties");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-sm md:text-lg lg:text-2xl font-bold">
          Properties Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden lg:flex">
            <div className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </div>
          </Button>
          <Button variant="outline" size="sm" className="hidden lg:flex">
            <div className="flex items-center">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </div>
          </Button>
          <div className="bg-muted rounded-md flex">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${isTable ? "" : "bg-background shadow"}`}
              onClick={() => setIsTable(false)}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${isTable ? "bg-background shadow" : ""}`}
              onClick={() => setIsTable(true)}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {isTable ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Tenants</TableHead>
                <TableHead className="text-center">Rent Due</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties?.map((property: Property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.tenantCount}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={property.rentDue > 0 ? "destructive" : "success"}
                      className="justify-center w-full max-w-[100px] mx-auto"
                    >
                      ${property.rentDue}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/property/${property.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

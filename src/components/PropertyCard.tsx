import { Link } from "react-router";
import { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {property.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {property.address}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Tenants: {property.tenantCount}
          </span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              property.rentDue > 0
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            }`}
          >
            Rent Due: ${property.rentDue}
          </span>
        </div>
      </div>
      <Link
        to={`/property/${property.id}`}
        className="block py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}

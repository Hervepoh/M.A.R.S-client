import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

import { ApiFilters } from "@/components/data-table-with-advance-filter";


export const useGetRolesPermissions = (page = 1, limit = 10, filters: ApiFilters | null = null) => {
  const query = useQuery({
    queryKey: ["roles-permissions", page, limit, filters], // Include filters in the query key
    queryFn: async () => {
      try {
        // Prepare the request body
        const requestData = {
          accessToken: Cookies.get('access_token'),
          page,
          limit,
          filters: filters ? filters : {}, // Include filters if provided
        };

        // Call the internal API with pagination and filters
        const response = await axios.post('/api/roles/permissions', requestData);
        return response.data; 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error; // Rethrow Axios errors
        } else {
          throw new Error('An unknown error occurred'); // Handle unknown errors
        }
      }
    },
    // Optional: Configure stale time, refetching, etc.
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });

  return query; // Return the query object
};
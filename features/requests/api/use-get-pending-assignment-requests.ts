import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

import { ApiFilters } from "@/components/data-table-with-advance-filter";

export const useGetPendingAssignmentRequests = (page = 1, limit = 10, filters: ApiFilters | null = null) => {
  const query = useQuery({
    queryKey: ['assignments-pending', page, limit, filters],
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
        const response = await axios.post('/api/assignments/pending', requestData);
        return response.data;
      } catch (error: any) {
        console.log('[ASSIGNMENT-PENDING] Une erreur inconnue s\'est produite',error);
        if (axios.isAxiosError(error)) {
          throw error;
        } else {
          throw new Error('Une erreur inconnue s\'est produite');
        }
      }

    },
  });

  return query;
};

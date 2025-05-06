import axios from 'axios';
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';


// Define a generic type for the request payload
type RequestType = any

// Custom hook for editing a request(transaction)
export const useEditAssignmentRequest = (id?: string) => {
  const queryClient = useQueryClient(); // Access the query client for managing cache

  // Define the mutation for editing a request
  const mutation = useMutation<
    ResponseType,  // Type of the response from the mutation
    Error,         // Type of error that may occur
    RequestType    // Type of the payload sent to the mutation
  >({
    // Function that handles the mutation
    mutationFn: async (json) => {
      // Send a POST request to update the request
      const response = await axios.put(`/api/assignments/${id}/update`, { data: json, accessToken: Cookies.get('access_token') });

      // Return the data from the response
      return response.data?.data;
    },
     // Callback executed on a successful mutation
    onSuccess: () => {
      toast.success("Request updated.") // Show success message
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["assignment", { id }] });
      queryClient.invalidateQueries({ queryKey: ["assignments-me"] });
      queryClient.invalidateQueries({ queryKey: ["assignments-pending"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requests-all"] });
      queryClient.invalidateQueries({ queryKey: ["requests-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["requests-unassignments"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    // Callback executed on an error during the mutation
    onError: () => {
      toast.error("Failed to edit request.") // Show error message
    },
  });

  return mutation; // Return the mutation object for use in components
};

import axios, { AxiosError } from 'axios';
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';

type RequestType = any

export const useCreateAssignmentRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await axios.post('/api/assignments/create', { data: json, accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Assignment Request has been created.")

      queryClient.invalidateQueries({ queryKey: ["requests-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["assignments-me"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error:any) => {
      console.log("[ASSIGNMENT-CREATE]")
       // Vérifiez si l'erreur a une réponse et qu'elle contient des informations pertinentes
       if (error.response) {
        const errorMessage = error.response.data?.message || "Failed to create request.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  return mutation;
};

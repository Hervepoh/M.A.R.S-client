import axios from 'axios';
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/hono";

// type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
// type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation<
      ResponseType,
      Error//,
      // RequestType
    >({
      mutationFn: async (json) => {
        // const response = await client.api.categories["bulk-delete"]["$post"]({ json });
  
        // return await response.json();
        return JSON.parse("a");
      },
      onSuccess: () => {
        toast.success("Categories deleted successfully")
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["requests"] });
        queryClient.invalidateQueries({ queryKey: ["requests-all"] });
        queryClient.invalidateQueries({ queryKey: ["requests-assignments"] });
        queryClient.invalidateQueries({ queryKey: ["requests-unassignments"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });
      },
      onError: () => {
        toast.error("Failed to delete categories.")
      },
    });
  
    return mutation;
  };
  
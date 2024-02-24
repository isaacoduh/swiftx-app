import { Store } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:7100";

export const useGetMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyStoreRequest = async (): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/store/get-my-store`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get store");
    }
    return response.json();
  };
  const { data: store, isLoading } = useQuery(
    "fetchMyStore",
    getMyStoreRequest
  );
  return { store, isLoading };
};

export const useCreateMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyStoreRequest = async (
    storeFormData: FormData
  ): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/store/create-my-store`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: storeFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createStore,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyStoreRequest);

  if (isSuccess) {
    toast.success("Store created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createStore, isLoading };
};

export const useUpdateMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateStoreRequest = async (
    storeFormData: FormData
  ): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/store/update-my-store`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: storeFormData,
      }
    );

    if (!response) {
      throw new Error("Failed to update store");
    }

    return response.json();
  };

  const {
    mutate: updateStore,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateStoreRequest);

  if (isSuccess) {
    toast.success("Store Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateStore, isLoading };
};

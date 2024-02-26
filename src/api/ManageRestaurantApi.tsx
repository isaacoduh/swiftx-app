import { Store } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "react-query";
import { toast } from "sonner";
import { Order } from "@/types";

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

export const useGetMyStoreOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyStoreOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/store/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyStoreOrders",
    getMyStoreOrdersRequest
  );
  return { orders, isLoading };
};

type UpdateOrderStatusRequest = { orderId: string; status: string };

export const useUpdateMyStoreOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyStoreOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/v1/store/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateStoreStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyStoreOrder);

  if (isSuccess) {
    toast.success("Order Updated");
  }

  if (isError) {
    toast.error("Unable to updated order!");
    reset();
  }

  return { updateStoreStatus, isLoading };
};

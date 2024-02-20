import { Order } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:7100";

type CheckoutSessionRequest = {
  cartItems: { productItemId: string; name: string; quantity: string }[];
  deliveryInformation: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  storeId: string;
};

export const useCreateCheckoutSession = () => {
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/order/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { createCheckoutSession, isLoading };
};

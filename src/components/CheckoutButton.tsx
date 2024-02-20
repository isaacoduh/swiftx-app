import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PaymentDetailForm, {
  PaymentFormData,
} from "@/forms/payment-detail-form/PaymentDetailForm";
import LoadingButton from "./LoadingButton";

type Props = {
  onCheckout: (paymentFormData: PaymentFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const isGetInfoLoading = () => {
    const payload = { status: true };
    return payload;
  };
  //   if (isLoading) {
  //     return <LoadingButton />;
  //   }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w[425px] md:min-w-[700px] bg-gray-50">
        <PaymentDetailForm
          onSave={onCheckout}
          //   isLoading="false"
          title="Confirm Delievery Information"
          buttonText="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;

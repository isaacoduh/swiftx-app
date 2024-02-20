import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";

type Props = { onCheckout: () => void; disabled: boolean; isLoading: boolean };

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w[425px] md:min-w-[700px] bg-gray-50">
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Continue to Payment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;

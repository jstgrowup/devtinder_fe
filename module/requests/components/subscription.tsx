import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPaymentReq } from "../types";
import CommonButton from "@/components/common/button";
import { SUBSCRIPTION_PLANS } from "@/types";
interface EditProfileModalProps {
  onCreateOrder: (body: IPaymentReq) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
const SubscriptionModal: React.FC<EditProfileModalProps> = ({
  open,
  setOpen,
  onCreateOrder,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Subscription Plans</DialogTitle>
        </DialogHeader>
        {/* Content here  */}
        <CommonButton
          onClick={() => onCreateOrder({ plan: SUBSCRIPTION_PLANS.BASE })}
        >
          <p>Base</p>
        </CommonButton>
        <CommonButton
          onClick={() =>
            onCreateOrder({ plan: SUBSCRIPTION_PLANS.SUPER_BOOST })
          }
        >
          <p>Super boost</p>
        </CommonButton>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;

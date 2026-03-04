import React from "react";
import { IPaymentReq } from "../types";
import CommonButton from "@/components/common/button";
import { SUBSCRIPTION_PLANS } from "@/types";
import CommonModal from "@/components/common/common-modal";
interface EditProfileModalProps {
  onCreateOrder: (body: IPaymentReq) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SubscriptionModal: React.FC<EditProfileModalProps> = ({
  open,
  setOpen,
  onCreateOrder,
}) => {
  return (
    <CommonModal open={open} setOpen={setOpen} title="Subscription Plans">
      <CommonButton
        onClick={() => onCreateOrder({ plan: SUBSCRIPTION_PLANS.BASE })}
      >
        Base
      </CommonButton>

      <CommonButton
        onClick={() => onCreateOrder({ plan: SUBSCRIPTION_PLANS.SUPER_BOOST })}
      >
        Super Boost
      </CommonButton>
    </CommonModal>
  );
};

export default SubscriptionModal;

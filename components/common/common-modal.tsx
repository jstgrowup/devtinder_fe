import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommonModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  setOpen,
  title,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;

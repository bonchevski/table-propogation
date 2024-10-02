import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { useState } from "react";

const Modal = ({node}) => {
  const [open, setOpen] = useState(false);
  const handleAddSubGroup = () => {
    const newNode = {
      id: Math.random(), // Or generate a unique ID
      name: 'New Sub Group',
      children: []
    };
    node.setDataValue('children', [...node.data.children, newNode]);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={handleAddSubGroup}>+ Add Sub Group</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
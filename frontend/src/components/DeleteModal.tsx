import Modal from "react-modal";
import { toast } from "react-toastify";

import { useAppDispatch } from "../app/store";
import { deleteUrl } from "../features/urls/urlSlice";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  urlId: string;
}

export function DeleteModal({ open, onClose, urlId }: DeleteModalProps) {
  const dispatch = useAppDispatch();

  const handleDeleteUrl = () => {
    dispatch(deleteUrl(urlId));
    onClose();
    toast.success("URL deleted successfully");
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles as any}
      contentLabel="Add Note">
      <h2>Are you sure?</h2>
      <button onClick={() => onClose()} className="btn-close">
        X
      </button>

      <div className="row right-position">
        <button className="btn btn-primary" onClick={handleDeleteUrl}>
          Delete
        </button>
        <button className="btn btn-reverse" onClick={() => onClose()}>
          Cancle
        </button>
      </div>
    </Modal>
  );
}

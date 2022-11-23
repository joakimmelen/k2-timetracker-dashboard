import { ReactNode } from "react";
import NewInvoiceForm from "../forms/NewInvoice";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function NewInvoiceModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <NewInvoiceForm isOpen={props.isOpen} toggle={props.toggle} />
          </div>
        </div>
      )}
    </>
  );
}

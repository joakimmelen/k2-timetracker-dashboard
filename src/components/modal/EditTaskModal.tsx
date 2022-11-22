import { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function EditTaskModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box"></div>
        </div>
      )}
    </>
  );
}

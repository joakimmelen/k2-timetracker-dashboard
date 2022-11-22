import { ReactNode } from "react";
import NewTaskForm from "../forms/NewTask";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function NewTaskModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <NewTaskForm isOpen={props.isOpen} toggle={props.toggle} />
          </div>
        </div>
      )}
    </>
  );
}

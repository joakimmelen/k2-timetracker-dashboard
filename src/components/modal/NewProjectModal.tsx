import { ReactNode } from "react";
import NewProjectForm from "../forms/NewProject";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function NewProjectModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <NewProjectForm isOpen={props.isOpen} toggle={props.toggle} />
          </div>
        </div>
      )}
    </>
  );
}

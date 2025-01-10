import React, { useEffect, FC } from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';


interface IModalProps {
    header?: string;
    onClose:((e?: React.SyntheticEvent) => void);
    children: React.ReactNode;
};

interface IModalHeaderProps {
    header: string;
    onClose: ((e?: React.SyntheticEvent) => void);
};

const modalRoot = document.getElementById("modals") as HTMLInputElement;


const ModalHeader = ({ header, onClose }: IModalHeaderProps) => {
    return (
        <>
            <div className={modalStyles.header}>
                <p className="text text_type_main-medium">{header}</p>
                <div className={modalStyles.button} onClick={onClose}>
                        <CloseIcon type="primary" />
                </div>
            </div>
        </>
    );
}; 

const Modal: FC<IModalProps>= ({header="", onClose, children}) => {
    
    useEffect(() => {
        const handleEscapePress = (e: KeyboardEvent) => {
          if(e.key === "Escape"){
            onClose()
          }
        }
        window.addEventListener('keydown', handleEscapePress)
        return () => {
            window.removeEventListener('keydown', handleEscapePress)
        }
    },[])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onClose} />
                <div className={modalStyles.main__container}>
                    <ModalHeader onClose={onClose} header={header}/>
                    {children}
                </div>
            </>
        ), 
        modalRoot
    );

};

export default Modal

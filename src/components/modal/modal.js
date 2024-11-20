import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';


const modalRoot = document.getElementById("modals");


const ModalHeader = ({ header, onClose }) => {
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

ModalHeader.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default function Modal ({header="", onClose, children}) {
    
    useEffect(() => {
        const handleEscapePress = (e) => {
          if(e.keyCode === 27){
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

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any
};

import overlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps{
    onClose: ((e: React.SyntheticEvent) => void);
};

export default function ModalOverlay ({onClose}: IModalOverlayProps){
    return (
        <div className={overlayStyles.overlay} onClick={onClose}/>
    ) 
}

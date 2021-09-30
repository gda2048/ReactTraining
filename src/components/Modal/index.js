import cn from 'classnames'

import s from './style.module.css'
import {useEffect, useRef} from "react";

const Modal = ({isOpen, title, children, onCloseModal}) => {
    const modalEl = useRef();

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
    }, [isOpen])

    const handleCloseModal = () => {
        onCloseModal && onCloseModal(false)
    }
    const handleClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)){
            handleCloseModal()
        }
    }

    return (
        <div className={cn(s.root, {[s.open]: isOpen})} onClick={handleClickRoot}>
            <div className={s.modal} ref={modalEl}>
                <div className={s.head}>
                    {title}
                    <span className={s.btnClose} onClick={handleCloseModal}/>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;
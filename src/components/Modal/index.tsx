import { MdClose } from "react-icons/md";
import style from "./style.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeContext";

interface ModalProps{
    closeModal: ()=> void,
    children: React.ReactNode
}

export const Modal = ({closeModal, children}: ModalProps) => {
    const {darkMode} = useContext(ThemeContext);

    return (
        <div className={style.background}>
            <div className={style.modal}>
                <button className={style.buttonClose}>
                    <MdClose
                    onClick={closeModal}
                    size={24}
                    color={darkMode ? "white" : "black"}
                    />
                </button>
                {children}
            </div>
        </div>
    )
}
import { ForwardedRef, forwardRef, useContext, useState } from "react"
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import { IInputProps } from "../Input";
import style from "./style.module.scss"
import { ThemeContext } from "../../../providers/ThemeContext";


export const InputPassword = forwardRef((
    {error, label, ...rest}: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
) => {
    const [visible, setVisible] = useState(false);
    const {darkMode} = useContext(ThemeContext)

    return (
        <div className={style.inputDiv}>
            <label className="headline primary-color">
                {label}
            </label>
        <div>
            <input type={visible ? "text" : "password"} ref={ref} {...rest}/>
                <button type="button" onClick={() => setVisible(!visible)}>
                    {
                        visible ?
                        <MdVisibilityOff
                        color={darkMode ? "white" : "black"}
                        size={24}
                        />
                        : <MdVisibility
                        color={darkMode ? "white" : "black"}
                        size={24}
                        />
                    }
                </button>
            </div>
            {error ? <p className="headline secondary-color">{error.message}</p> : null}
        </div>
    )
})
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react"
import { FieldError } from "react-hook-form"
import style from "./style.module.scss"
export interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: FieldError | undefined
    label: string | undefined
}

export const Input = forwardRef((
    {error, label, ...rest}: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
) => {
    return (
        <div className={style.inputDiv}>
            <label className="headline primary-color">
                {label}
            </label>

            <input ref={ref} {...rest} />            
            {error ?
            <p className="headline secondary-color">
                {error.message}
            </p>
            : null}
        </div>
    )
})
import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./style.module.scss";
import { FieldError } from "react-hook-form";


interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    error?: FieldError | undefined
    label: string | undefined
}

export const Textarea = forwardRef((
    { error, label, ...rest}: ITextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
) => {
    return (
        <div className={styles.textareaDiv}>
           <label className="headline primary-color">
                {label}
            </label>

           <textarea ref={ref} {...rest} />
           {error ?
           <p className="headline secondary-color">
            {error.message}
            </p>
            : null}
        </div>
     );
});
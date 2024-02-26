import { useContext, useState } from "react"
import { EmailInfo } from "./EmailInfo"
import { ContactContext } from "../../../providers/ContactContext"
import { MdAdd } from "react-icons/md";
import style from "./style.module.scss"
import { ThemeContext} from "../../../providers/ThemeContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactEmailSchema } from "../../../schemas/contact.schema";
import { ICreateContactEmail } from "../../../interfaces/contact.interfaces";
import loadingIcon from "../../../assets/loadingIcon.svg"

export const EmailsInfoCard = () => {
    const {userContact, registerContactEmail} = useContext(ContactContext);
    const {darkMode} = useContext(ThemeContext);

    const[creatingEmail, setCreatingEmail] = useState(false);

    const{
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm<ICreateContactEmail>({
        resolver: zodResolver(createContactEmailSchema)
    });

    const submitEmail: SubmitHandler<ICreateContactEmail> =
    (formData: ICreateContactEmail) => {
        registerContactEmail(
            formData,
            userContact!.id,
            setCreatingEmail,
            reset
            )
    };

    return (
            <div className={style.infoDiv}>
                <label className="headline primary-color">
                    Emails
                </label>
            {
                userContact!.contactEmails.map((email) =>
                <EmailInfo key={email.id} email={email}/>)
            }
                <form onSubmit={handleSubmit(submitEmail)}>
                    <div>
                        <input type="text" {...register("email")}/>
                        {
                            errors.email ?
                            <small className="headline error">
                                {errors.email.message}
                            </small>
                            : null
                        }
                        <button type={!creatingEmail ? "submit" : "button"}>
                            {   !creatingEmail ?
                                <MdAdd size={24} color={darkMode ? "white": "black"}/>
                                : <img src={loadingIcon} alt="loading" />
                            }
                        </button>
                    </div>
                </form>
            </div>
    )
}
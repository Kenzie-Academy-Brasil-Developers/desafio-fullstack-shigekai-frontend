import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";
import { ThemeContext } from "../../../providers/ThemeContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateUserEmail } from "../../../interfaces/user.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserEmailSchema } from "../../../schemas/user.schemas";
import style from "../../FullContactCard/EmailsInfoCard/style.module.scss"
import { MdAdd } from "react-icons/md";
import loadingIcon from "../../../assets/loadingIcon.svg";
import { EmailInfo } from "./EmailInfo";


export const Emails = () => {
    const {
        user,
        registerUserEmail,
        userEmails
    } = useContext(UserContext);

    const {darkMode} = useContext(ThemeContext);

    const[creatingEmail, setCreatingEmail] = useState(false);

    const{
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm<ICreateUserEmail>({
        resolver: zodResolver(createUserEmailSchema)
    });

    const submitEmail: SubmitHandler<ICreateUserEmail> =
    (formData: ICreateUserEmail) => {
        registerUserEmail(
            formData,
            user!.id,
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
                userEmails.map((email) =>
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
import { useContext, useState } from "react"
import { ContactContext } from "../../../providers/ContactContext"
import { MdAdd } from "react-icons/md";
import { PhoneInfo } from "./PhoneInfo";
import style from "../EmailsInfoCard/style.module.scss";
import { ThemeContext } from "../../../providers/ThemeContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateContactPhone } from "../../../interfaces/contact.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import loadingIcon from "../../../assets/loadingIcon.svg"
import { createContactPhoneSchema } from "../../../schemas/contact.schema";

export const PhonesInfoCard = () => {
    const {userContact, registerContactPhone} = useContext(ContactContext);
    const {darkMode} = useContext(ThemeContext);
    const [creatingPhone, setCreatingPhone] = useState<boolean>(false);

    const{
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm<ICreateContactPhone>({
        resolver: zodResolver(createContactPhoneSchema)
    });

    const submitEmail: SubmitHandler<ICreateContactPhone> =
    (formData: ICreateContactPhone) => {
        registerContactPhone(
            formData,
            userContact!.id,
            setCreatingPhone,
            reset
        )
    }

    return (
        <div className={style.infoDiv}>
            <label className="headline primary-color">
                Telefones
            </label>
            {
                userContact!.contactPhones.map((phone) =>
                <PhoneInfo key={phone.id} phone={phone}/>)
            }
            <form onSubmit={handleSubmit(submitEmail)}>
                <div>
                    <input type="number" {...register("phone")}/>
                    {
                        errors.phone ?
                        <small className="headline error">
                            {errors.phone.message}
                        </small>
                        : null
                    }
                    <button type={creatingPhone ? "button" : "submit"}>
                        {
                            !creatingPhone ?
                            <MdAdd size={24} color={darkMode ? "white": "black"}/>
                            : <img src={loadingIcon} alt="" />
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}
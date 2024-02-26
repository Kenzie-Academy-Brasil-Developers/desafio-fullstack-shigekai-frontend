import { useContext, useState } from "react"
import { MdAdd } from "react-icons/md";
import { PhoneInfo } from "./PhoneInfo";
import style from "../../FullContactCard/EmailsInfoCard/style.module.scss"
import { ThemeContext } from "../../../providers/ThemeContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loadingIcon from "../../../assets/loadingIcon.svg"
import { UserContext } from "../../../providers/UserContext";
import { ICreateUserPhone } from "../../../interfaces/user.interfaces";
import { createUserPhoneSchema } from "../../../schemas/user.schemas";

export const Phones = () => {
    const {
        user,
        registerUserPhone,
        userPhones
    } = useContext(UserContext);
    const {darkMode} = useContext(ThemeContext);
    const [creatingPhone, setCreatingPhone] = useState<boolean>(false);

    const{
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm<ICreateUserPhone>({
        resolver: zodResolver(createUserPhoneSchema)
    });

    const submitPhone: SubmitHandler<ICreateUserPhone> =
    (formData: ICreateUserPhone) => {
        registerUserPhone(
            formData,
            user!.id,
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
                userPhones.map((phone) =>
                <PhoneInfo key={phone.id} phone={phone}/>)
            }
            <form onSubmit={handleSubmit(submitPhone)}>
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
import { useContext, useState } from "react"
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./style.module.scss"
import { ContactContext } from "../../../providers/ContactContext";
import { ICreateContact } from "../../../interfaces/contact.interfaces";
import { createContactSchema } from "../../../schemas/contact.schema";
import { Textarea } from "../Textarea";

interface IRegisterContactForm{
    setCreatingContact: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegisterContactForm = ({setCreatingContact}: IRegisterContactForm) => {
    const [loading, setLoading] = useState<boolean>(false);


    const {registerContact} = useContext(ContactContext);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<ICreateContact>({
        resolver: zodResolver(createContactSchema)
    });

    const submitRegister: SubmitHandler<ICreateContact> =  (formData: ICreateContact) => {
        registerContact(formData, setLoading, reset, setCreatingContact)
    }


    return(
        <div className={style.formBox}>
                <button
                className="button color-pink small modalTop"
                disabled={loading}
                onClick={() => setCreatingContact(false)}
                >
                    Cancelar
                </button>
            <form className={style.form} onSubmit={handleSubmit(submitRegister)}>
            <h1 className="title1">Novo Contato</h1>
                <Input
                    type="text"
                    label="Nome"
                    {...register("name")}
                    error={errors.name}
                    disabled={loading}
                />
                <Input
                    type="email"
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                    disabled={loading}
                />
                <Input
                    type="tel"
                    label="Telefone"
                    {...register("phone")}
                    error={errors.phone}
                    disabled={loading}
                />
                <Textarea
                    label="Descrição"
                    {...register("description")}
                    error={errors.description}
                    disabled={loading}
                />
                <div className={style.buttonDiv}>
        
                    <button
                    className="button color-blue"
                    type="submit"
                    disabled={loading}
                    >
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </div>
            </form>
        </div>
    )
}
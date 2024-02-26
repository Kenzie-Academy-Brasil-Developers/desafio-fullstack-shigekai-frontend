import { useContext, useState} from "react"
import { ContactContext } from "../../../providers/ContactContext"
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editContactSchema } from "../../../schemas/contact.schema";
import { Textarea } from "../Textarea";
import { IEditContact } from "../../../interfaces/contact.interfaces";
import style from "../../FullContactCard/style.module.scss"

export const EditContactForm = () => {
    const {userContact, editContact, setEditingContact} = useContext(ContactContext);
    const[loading, setLoading] = useState<boolean>(false);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        resolver: zodResolver(editContactSchema),
        values: {
            name: userContact!.name,
            description: userContact!.description
        }
    });

    const submitEditedContact: SubmitHandler<IEditContact> = (
        formData: IEditContact
    ) => {
        editContact(
            formData,
            userContact!.id,
            setLoading,
            setEditingContact,
        )
    }

    return (
        <div className={style.formBox}>
            <h1 className="title1 modalTop">Editar {userContact!.name}</h1>
            <button
            className="button color-pink small modalTop"
            onClick={() => setEditingContact(false)}
            >
                Cancelar
            </button>
            <form
            className={style.form}
            onSubmit={handleSubmit(submitEditedContact)}
            >
                <Input
                error={errors.name}
                label="Nome"
                {...register("name")}
                />
                <Textarea
                error={errors.description}
                label="Descrição"
                {...register("description")}
                />
                <button
                type="submit"
                className="button color-blue large"
                disabled={loading}
                >
                    {
                        loading ?
                        "Salvando..."
                        : "Salvar"
                    }
                </button>
            </form>
        </div>
    )
}
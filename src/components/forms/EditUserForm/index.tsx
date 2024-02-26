import { useContext, useState} from "react"
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "../../FullContactCard/style.module.scss"
import { UserContext } from "../../../providers/UserContext";
import { editUserSchema } from "../../../schemas/user.schemas";
import { IEditUser } from "../../../interfaces/user.interfaces";


export const EditUserForm = () => {
    const {user, editUser, setEditingUser} = useContext(UserContext);
    const[loading, setLoading] = useState<boolean>(false);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        resolver: zodResolver(editUserSchema),
        values: {
            name: user!.name,
        }
    });

    const submitEditedUser: SubmitHandler<IEditUser> = (
        formData: IEditUser
    ) => {
        editUser(
            formData,
            user!.id,
            setLoading
        )
    }

    return (
        <div className={style.formBox}>
            <h1 className="title1 modalTop">Editar {user!.name}</h1>
            <button
            className="button color-pink small modalTop"
            onClick={() => setEditingUser(false)}
            >
                Cancelar
            </button>
            <form
            className={style.form}
            onSubmit={handleSubmit(submitEditedUser)}
            >
                <Input
                error={errors.name}
                label="Nome"
                {...register("name")}
                />
                <Input
                error={errors.password}
                label="Nova Senha"
                {...register("password")}
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
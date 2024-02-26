import { useContext, useState } from "react"
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserRegister } from "../../../interfaces/user.interfaces";
import { UserContext } from "../../../providers/UserContext";
import style from "./style.module.scss"
import { userRegisterSchema } from "../../../schemas/user.schemas";

export const RegisterForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const {registerUser} = useContext(UserContext);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<IUserRegister>({
        resolver: zodResolver(userRegisterSchema)
    });

    const submitRegister: SubmitHandler<IUserRegister> =  (formData: IUserRegister) => {
        registerUser(formData, setLoading, reset)
    }


    return(
        <form className={style.form} onSubmit={handleSubmit(submitRegister)}>
        <h1 className="title1">Cadastre-se</h1>
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
            <InputPassword
                label="Senha"
                {...register("password")}
                error={errors.password}
                disabled={loading}
            />
            <Input
                type="tel"
                label="Telefone"
                {...register("phone")}
                error={errors.phone}
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
                <button
                className="button color-pink"
                disabled={loading}
                onClick={() => navigate("/")}
                >
                    Faça login
                </button>
            </div>
        </form>
    )
}
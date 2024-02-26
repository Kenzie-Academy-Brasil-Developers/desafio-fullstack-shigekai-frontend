import { useContext, useState } from "react"
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../../../schemas/user.schemas";
import { IUserLogin } from "../../../interfaces/user.interfaces";
import { UserContext } from "../../../providers/UserContext";
import style from "./style.module.scss"

export const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const {loginUser} = useContext(UserContext);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<IUserLogin>({
        resolver: zodResolver(userLoginSchema)
    });

    const submitLogin: SubmitHandler<IUserLogin> = (formData: IUserLogin) => {
        loginUser(formData, setLoading, reset)
    }


    return(
        <form className={style.form} onSubmit={handleSubmit(submitLogin)}>
        <h1 className="title1">Login</h1>
            <Input
                type="Email"
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
            <div className={style.buttonDiv}>
                <button
                className="button color-blue"
                type="submit"
                disabled={loading}
                >
                    {loading ? "Acessando..." : "Entrar"}
                </button>
                <button
                className="button color-pink"
                disabled={loading}
                onClick={() => navigate("/register")}
                >
                    Cadastre-se
                </button>
            </div>
        </form>
    )
}
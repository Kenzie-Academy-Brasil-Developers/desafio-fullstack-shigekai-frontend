import logo from "../../assets/logo.svg";
import { LoginForm } from "../../components/forms/LoginForm";
import style from "./style.module.scss"

export const LoginPage = () => {
    return (
        <main className="container">
            <div className={style.div}>
                <div>
                    <img src={logo} alt="user agenda logo" />
                </div>
                <div className={style.wrap}>
                    <LoginForm/>
                </div>
               

            </div>
        </main>
    )
}
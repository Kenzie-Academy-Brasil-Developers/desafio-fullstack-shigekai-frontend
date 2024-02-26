import logo from "../../assets/logo.svg"
import { RegisterForm } from "../../components/forms/RegisterForm"
import style from "./style.module.scss"

export const RegisterPage = () => {
    return(
        <main>
            <div className={style.div}>
                <div>
                    <img src={logo} alt="user agenda logo" />
                </div>
                <div className={style.wrap}>
                    <RegisterForm/>
                </div>
               

            </div>
        </main>
    )
}
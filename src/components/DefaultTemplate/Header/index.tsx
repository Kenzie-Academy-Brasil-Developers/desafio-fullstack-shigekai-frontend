import { MdAccountCircle, MdAdminPanelSettings } from "react-icons/md"
import logo from "../../../assets/logo.svg"
import { useContext } from "react"
import { UserContext } from "../../../providers/UserContext"
import style from "./style.module.scss"
import { MobileContext } from "../../../providers/MobileContext"
import { HamburguerMenu } from "../../HamburguerMenu"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const {user, logoutUser} = useContext(UserContext);
    const {isMobile} = useContext(MobileContext);
    const navigate = useNavigate();
    return (
       <div className={style.wrap}>
            <header className={style.header}>
                <div className={style.divImg}>
                    <img
                    src={logo}
                    alt="user agenda logo"
                    onClick={() => navigate("/home")}
                    />
                </div>
                <div className={style.divButtons}>
                { isMobile ? <HamburguerMenu/>
                :
                    <>
                        <button onClick={() => logoutUser()}
                         type="button" className="button large color-pink">
                            Sair
                        </button>
                        <div>
                            <button
                            onClick={() => navigate("/user")}
                            className="button large color-blue"
                            >
                                <MdAccountCircle size={24}/>
                                <p>Perfil</p>
                            </button>
                        </div>
                        <div>
                            { user!.admin ?
                            <button className="button color-special large">
                                <MdAdminPanelSettings size={24}/>
                                <p>Admin</p>
                            </button>
                            : null
                            }  
                    </div>
                    </>         
                
                }
                </div>
            </header>
       </div>
    )
}
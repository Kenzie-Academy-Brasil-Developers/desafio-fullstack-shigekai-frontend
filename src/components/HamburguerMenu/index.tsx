import { useContext, useState } from "react"
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { UserContext } from "../../providers/UserContext";
import style from "./style.module.scss"
import { useNavigate } from "react-router-dom";

export const HamburguerMenu = () => {
    const[isOpen, setIsOpen] = useState<boolean>(false);

    const {user, logoutUser} = useContext(UserContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div className={style.container} onClick={toggleMenu}>
            <div className={style.divIcon}>
                {
                    isOpen ? <MdMenuOpen size={32} color="white"/>
                    : <MdMenu size={32} color="white"/>
                }
            </div>
            {
                isOpen ?
                <div className={style.divList}>
                    <ul>
                        <li
                        className="paragraph primary-color"
                        onClick={() => navigate("/user")}
                        >
                            Perfil
                        </li>
                        {
                            user!.admin ?
                            <li className="paragraph primary-color">
                                Admin
                            </li>
                            :null
                        }
                        <li className="paragraph primary-color" onClick={logoutUser}>
                            Sair
                        </li>
                    </ul>
                </div>
                : null
            }
        </div>
    )
}
import { useContext, useState } from "react"
import { UserContext } from "../../providers/UserContext";
import style from "../../components/FullContactCard/style.module.scss"
import { SingleInfoCard } from "../../components/FullContactCard/SingleInfoCard";
import { Emails } from "../../components/FullUserCard/Emails";
import { Phones } from "../../components/FullUserCard/Phones";
import { EditUserForm } from "../../components/forms/EditUserForm";

export const UserPage = () => {
    const {
        user,
        editingUser,
        setEditingUser,
        removeUser
    } = useContext(UserContext);

    const [removingUser, setRemovingUser] = useState<boolean>(false);

    return (
        
        <div className="fullPage">
        {   !editingUser ?
            <div className={style.formBox}>
                        <h1 className="title1 modalTop">
                            {user!.name}
                        </h1>
                        <button
                        className="button color-blue small modalTop"
                        onClick={() => setEditingUser(true)}
                        >
                            Editar
                        </button>
                        <button
                        className="button color-pink small modalTop2"
                        onClick={() => removeUser(
                            user!.id,
                            setRemovingUser
                        )}
                        disabled={removingUser}
                        >
                            {!removingUser ?
                            "Excluir Perfil"
                            :"Excluindo..."
                            }
                        </button>
                    <div className={style.fullPageForm}>
                        <SingleInfoCard info="Nome" value={user!.name}/>
                        <Emails/>
                        <Phones/>
                    </div>
                </div>
                : <EditUserForm/>
            }
        </div>
    )
}
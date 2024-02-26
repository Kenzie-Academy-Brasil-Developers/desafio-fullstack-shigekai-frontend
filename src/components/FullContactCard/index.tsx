import { useContext, useState } from "react"
import { ContactContext } from "../../providers/ContactContext"
import { SingleInfoCard } from "./SingleInfoCard"
import { EmailsInfoCard } from "./EmailsInfoCard"
import { PhonesInfoCard } from "./PhonesInfoCard"
import style from "./style.module.scss"
import { EditContactForm } from "../forms/EditContactForm"

interface IFullContactCardProps{
    setLookingContact: React.Dispatch<React.SetStateAction<boolean>>
}

export const FullContactCard = (
    {setLookingContact}: IFullContactCardProps
    ) => {
    const {
        userContact,
        setEditingContact,
        editingContact,
        removeContact
    } = useContext(ContactContext)

    const [removingContact, setRemovingContact] = useState(false);

    return (
        <>
            { !editingContact ?
            <div className={style.formBox}>
                    <h1 className="title1 modalTop">
                        {
                        userContact!.name.split(" ")[0]
                        }
                    </h1>
                    <button
                    className="button color-blue small modalTop"
                    onClick={() => setEditingContact(true)}
                    >
                        Editar
                    </button>
                    <button
                    className="button color-pink small modalTop2"
                    onClick={() => removeContact(
                        userContact!.id,
                        setRemovingContact,
                        setLookingContact
                    )}
                    disabled={removingContact}
                    >
                        {!removingContact ?
                        "Excluir Contato"
                        :"Excluindo..."
                        }
                    </button>
                <div className={style.form}>
                    <SingleInfoCard info="Nome" value={userContact!.name}/>
                    <EmailsInfoCard/>
                    <PhonesInfoCard/>
                    <SingleInfoCard info="Descrição" value={userContact!.description}/>
                </div>
            </div>
            :
            <EditContactForm/>
            }
        </>
    )
}
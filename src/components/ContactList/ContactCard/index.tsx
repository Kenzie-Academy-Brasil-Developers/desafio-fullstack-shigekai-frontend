import { useContext } from "react"
import { IContact } from "../../../interfaces/contact.interfaces"
import style from "./style.module.scss"
import { ContactContext } from "../../../providers/ContactContext"

interface IContactCard{
    contact: IContact
    setLookingContact: React.Dispatch<React.SetStateAction<boolean>>
    setLoadingContact: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContactCard = ({
    contact,
    setLookingContact,
    setLoadingContact
}: IContactCard) => {
    const {retrieveContact} = useContext(ContactContext);
    return (
        <div
        className={style.wrap}
        onClick={() => retrieveContact(
            setLoadingContact,
            setLookingContact,
            contact.id
        )}
        >
            <div className={style.card}>
                <p className="paragraph">{
                contact.name.length > 20 ?
                `${contact.name.substring(0,21)}...`
                : contact.name
            }</p>
            </div>
        </div>
    )
}
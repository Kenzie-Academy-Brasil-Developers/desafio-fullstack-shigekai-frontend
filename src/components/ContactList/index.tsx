import { useContext } from "react"
import { ContactContext } from "../../providers/ContactContext"
import { ContactCard } from "./ContactCard";
import style from "./style.module.scss"
import { IContact } from "../../interfaces/contact.interfaces";

interface IContactListProps{
    searching: boolean
    searchedContacts: IContact[] | []
    setLookingContact: React.Dispatch<React.SetStateAction<boolean>>
    setLoadingContact: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContactList = ({
    searching,
    searchedContacts,
    setLookingContact,
    setLoadingContact
}: IContactListProps) => {
    const {userContacts} = useContext(ContactContext);

    return (
            <ul className={style.ul}>
                { !searching ?
                userContacts.map((contact) =>
                <ContactCard
                key={contact.id}
                contact={contact}
                setLookingContact={setLookingContact}
                setLoadingContact={setLoadingContact}
                />)
                :
                searchedContacts.map((contact) =>
                <ContactCard
                key={contact.id}
                contact={contact}
                setLookingContact={setLookingContact}
                setLoadingContact={setLoadingContact}
                />)
                }
            </ul>
    )
}
import { useContext, useState} from "react"
import { UserContext } from "../../providers/UserContext"
import { MdSearch } from "react-icons/md"
import { IoMdAddCircleOutline } from "react-icons/io"
import style from "./style.module.scss"
import { Modal } from "../../components/Modal"
import { RegisterContactForm } from "../../components/forms/RegisterContact"
import { IContact } from "../../interfaces/contact.interfaces"
import { ContactContext } from "../../providers/ContactContext"
import { ContactList } from "../../components/ContactList"
import { FullContactCard } from "../../components/FullContactCard"
import { LoadingPage } from "../LoadingPage"

export const HomePage = () => {
    const {user} = useContext(UserContext);
    const {userContacts, setUserContact, setEditingContact} = useContext(ContactContext);

    const[creatingContact, setCreatingContact] = useState<boolean>(false);

    const changeModal = () => {
        setCreatingContact(!creatingContact);
    };

    const [searchedContacts, setSearchedContacts] = useState<IContact[] | []>([]);

    const [searching, setSearching] = useState(false);

    const [lookingContact, setLookingContact] = useState<boolean>(false);

    const [loadingContact, setLoadingContact] = useState<boolean>(false);

    const closeLookingContactModal = () => {
        setUserContact(null)
        setLookingContact(false)
        setEditingContact(false)
    };

    const setSearch = (value: string) => {
        const parsedValue = value.toLowerCase()
        if(parsedValue !== ""){
            setSearching(true);
            const filteredContacts = userContacts.filter((contact) => {
                const parsedName = contact.name.toLowerCase()
                return parsedName.includes(parsedValue);
            });

            setSearchedContacts(filteredContacts)
        }else{
            setSearching(false)
        }
    };
 
    return(
        <main className={style.main}>

            {
                creatingContact ?
                <Modal closeModal={changeModal}>
                    <RegisterContactForm
                    setCreatingContact={setCreatingContact}
                    />
                </Modal>
                : null
            }

            {
                lookingContact ?
                <Modal closeModal={closeLookingContactModal}>
                    {
                        loadingContact ? <LoadingPage/>
                        :<FullContactCard
                            setLookingContact={setLookingContact}
                        />
                    }
                </Modal>
                : null
            }

            <div className={style.titleDiv}>
                <h1 className="title1">
                    Olá, {` ${user!.name}`}
                </h1>
            </div>

            <div className={style.manageContactDiv}>
                <h2 className="title2">
                    Contatos
                </h2>

                <div>
                    <input
                    type="text"
                    placeholder="Pesquisar contato..."
                    onChange={(e)=> setSearch(e.target.value)}
                    /> 
                    <MdSearch className={style.icon}/>
                </div>

                <div>
                    <IoMdAddCircleOutline onClick={() =>
                        setCreatingContact(true)}
                        size={24} color="white"
                    />
                </div>
            </div>

            <div className="fullPage">
                <div className={style.contactsDiv}>
                    <ContactList
                    searching={searching}
                    searchedContacts={searchedContacts}
                    setLookingContact={setLookingContact}
                    setLoadingContact={setLoadingContact}
                    />
                </div>
            </div>
        </main>
    )
}
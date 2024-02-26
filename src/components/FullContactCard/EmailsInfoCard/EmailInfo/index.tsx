import { useContext, useState } from "react"
import { ThemeContext } from "../../../../providers/ThemeContext"
import { MobileContext } from "../../../../providers/MobileContext"
import { ContactContext} from "../../../../providers/ContactContext"
import { IoMdTrash } from "react-icons/io"
import loadingIcon from "../../../../assets/loadingIcon.svg"

interface IEmailsInfoProps{
    email: {
        id: string,
        email: string,
        updatedAt: string
    }
}

export const EmailInfo = ({email}: IEmailsInfoProps) => {

    const {darkMode} = useContext(ThemeContext);
    const {isMobile} = useContext(MobileContext);
    const {removeContactInfo} = useContext(ContactContext);
    const [removingEmail, setRemovingEmail] = useState<boolean>(false);

    return (
        <p>
            {email.email}
        {!isMobile ?
        <button>
            {
            !removingEmail ?
            <IoMdTrash
            size={24}
            color={darkMode ? "white" : "black"}
            onClick={()=> removeContactInfo(
                "email",
                email.id,
                setRemovingEmail
            )}
            />
            :
            <img src={loadingIcon} alt="loading" className="loadingIconMini" />
            }
        </button>
        : null
        }
        </p>
    )
}
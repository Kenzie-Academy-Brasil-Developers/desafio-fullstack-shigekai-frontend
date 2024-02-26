import { useContext, useState } from "react"
import { ThemeContext } from "../../../../providers/ThemeContext"
import { MobileContext } from "../../../../providers/MobileContext"
import { ContactContext } from "../../../../providers/ContactContext"
import { IoMdTrash } from "react-icons/io"
import loadingIcon from "../../../../assets/loadingIcon.svg"

interface IEmailsInfoProps{
    phone: {
        id: string,
        phone: string,
        updatedAt: string
    }
}

export const PhoneInfo = ({phone}: IEmailsInfoProps) => {

    const {darkMode} = useContext(ThemeContext);
    const{isMobile} = useContext(MobileContext);
    const {removeContactInfo} = useContext(ContactContext);
    const [removingPhone, setRemovingPhone] = useState<boolean>(false);
    
    return (
        <p>
        {phone.phone}
        {!isMobile ?
        <button>
            {!removingPhone ?
                <IoMdTrash
                size={24}
                color={darkMode ? "white" : "black"}
                onClick={() => {
                    removeContactInfo(
                        "phone",
                        phone.id,
                        setRemovingPhone
                    )
                }}
                />
                : <img
                    src={loadingIcon}
                    className="loadingIconMini"
                    alt="loading"
                    />
            }
        </button>
        : null
        }
    </p>
    )
}
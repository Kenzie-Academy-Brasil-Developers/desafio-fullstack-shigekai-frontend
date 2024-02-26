import { useContext, useState } from "react"
import { ThemeContext } from "../../../../providers/ThemeContext"
import { MobileContext } from "../../../../providers/MobileContext"
import { IoMdTrash } from "react-icons/io"
import loadingIcon from "../../../../assets/loadingIcon.svg"
import { UserContext } from "../../../../providers/UserContext"

interface IPhoneInfoProps{
    phone: {
        id: string,
        phone: string,
        updatedAt: string,
    }
}

export const PhoneInfo = ({phone}: IPhoneInfoProps) => {

    const {darkMode} = useContext(ThemeContext);
    const {isMobile} = useContext(MobileContext);
    const {removeUserInfo} = useContext(UserContext);
    const [removingPhone, setRemovingPhone] = useState<boolean>(false);

    return (
        <p>
            {phone.phone}
        {!isMobile ?
        <button>
            {
            !removingPhone ?
            <IoMdTrash
            size={24}
            color={darkMode ? "white" : "black"}
            onClick={()=> removeUserInfo(
                "phone",
                phone.id,
                setRemovingPhone
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
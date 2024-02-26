import { useContext } from "react"
import { MdOutlineContentCopy } from "react-icons/md"
import { ThemeContext } from "../../../providers/ThemeContext"
import style from "./style.module.scss"
import { MobileContext } from "../../../providers/MobileContext"

interface ISingleInfoCardProps{
    info: string,
    value: string
}

export const SingleInfoCard = ({info, value}: ISingleInfoCardProps) => {

    const {darkMode} = useContext(ThemeContext);
    const {isMobile} = useContext(MobileContext);

    return (
        <div className={style.infoDiv}>
            <label className="headline primary-color">
                {info}
            </label>
            <p>
                {value}
                {!isMobile ?
                    <button>
                        <MdOutlineContentCopy
                        size={24}
                        color={darkMode ? "white" : "black"}
                        />
                    </button>
                    : null
                }
            </p>
        </div>
    )
}
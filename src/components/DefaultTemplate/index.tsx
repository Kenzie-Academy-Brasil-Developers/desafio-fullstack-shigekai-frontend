import { Footer } from "./Footer"
import { Header } from "./Header"
import pageBox from "../../styles/modules/pageBox.module.scss"
interface IDefaultTemplateProps{
    children: React.ReactNode
}

export const DefaultTemplate = ({children}: IDefaultTemplateProps) => {
    return(
        <>
            <Header/>
                <main className={pageBox.pageBox}>
                    {children}
                </main>
            <Footer/>
        </>
    )
}   
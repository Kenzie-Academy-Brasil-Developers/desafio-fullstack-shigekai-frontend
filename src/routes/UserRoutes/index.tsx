import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"
import { Navigate, Outlet } from "react-router-dom";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import { ContactProvider } from "../../providers/ContactContext";

export const UserRoutes = () => {
    const {user} = useContext(UserContext);

    return user ? 
    <DefaultTemplate>
       <ContactProvider>
            <Outlet/>
        </ContactProvider>
    </DefaultTemplate> : <Navigate to="/" />
}
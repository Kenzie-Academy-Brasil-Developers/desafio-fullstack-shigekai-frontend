import { Route, Routes } from "react-router-dom"
import { PublicRoutes } from "./PublicRoutes"
import { LoginPage } from "../pages/LoginPage"
import { UserRoutes } from "./UserRoutes"
import { HomePage } from "../pages/HomePage"
import { RegisterPage } from "../pages/RegisterPage"
import { UserPage } from "../pages/UserPage"


export const RoutesMain = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<UserRoutes/>}>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/user" element={<UserPage/>}/>
            </Route>
        </Routes>
    )
}
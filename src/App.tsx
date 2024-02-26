import { useContext } from "react"
import { UserContext } from "./providers/UserContext";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { LoadingPage } from "./pages/LoadingPage";
import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./providers/ThemeContext";


function App() {
    const {loading} = useContext(UserContext);
    const {darkMode} = useContext(ThemeContext);

  return (
    <>
        {
            loading ?
            <LoadingPage/>
            :<RoutesMain/>
        }
        <ToastContainer
         position="bottom-right"
         autoClose={2000}
         theme={darkMode ? "dark" : "light"}
         />
    </>
  )
}

export default App

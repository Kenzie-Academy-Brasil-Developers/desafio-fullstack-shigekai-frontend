import { createContext, useEffect, useState } from "react"
import { ICreateUserEmail, ICreateUserPhone, IEditUser, IUser, IUserContext, IUserEmail, IUserLogin, IUserLoginResponse, IUserPhone, IUserProviderProps, IUserRegister } from "../interfaces/user.interfaces";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const UserContext = createContext({} as IUserContext)

export const UserProvider = ({children}: IUserProviderProps) => {
    
    const [user, setUser] = useState<IUser | null>(null);
    
    const [userEmails, setUserEmails] = useState<IUserEmail[] | [] >([]);
    
    const[userPhones, setUserPhones] = useState<IUserPhone[] | []>([])
    
    const[loading, setLoading] = useState<boolean>(false);

    const [editingUser, setEditingUser] = useState<boolean>(false);
    
    const navigate = useNavigate();

    const pathname = window.location.pathname;
    
    useEffect(() => {
        const token = localStorage.getItem("@TOKEN");
        const userId = localStorage.getItem("@USERID");
        
    
        const retrieveUser = async () => {
            try {
                setLoading(true);
    
                const {data} = await api.get(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const {userEmails, userPhones, ...user} = data;
    
                setUser(user);
    
                setUserEmails(userEmails);
    
                setUserPhones(userPhones);                
    
                navigate(pathname);
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error(error);
                    toast.error(error.response?.data.details)
                }else{
                    console.error(error)
                    toast.error("Erro interno, tente novamente em minutos")
                } 
            } finally {
                setLoading(false)
            }
        };
    
        if(token && userId){
            retrieveUser()
        }
    },[])
    
    const loginUser = async (
        formData: IUserLogin,
        setLoading:  React.Dispatch<React.SetStateAction<boolean>>,
        reset: ()=>void
        ) => {
            try {
                setLoading(true);
                const {data} = await api.post<IUserLoginResponse>("/users/login", formData);
                setUser(data.user);
                localStorage.setItem("@TOKEN", data.token);
                localStorage.setItem("@USERID", data.user.id);
                reset();
                toast.success("Login realizado com sucesso !")
                navigate("/home");

        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error);
                toast.error(error.response?.data.details)
            }else{
                console.error(error)
                toast.error("Erro interno, tente novamente em minutos")
            }      
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (
        formData: IUserRegister,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: ()=>void
    ) => {
        try {
            setLoading(true);
            await api.post("/users", formData);
            reset();
            navigate("/");
            toast.success("Registro feito com sucesso")
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error);
                toast.error(error.response?.data.details)
            }else{
                console.error(error)
                toast.error("Erro interno, tente novamente em minutos")
            } 
        } finally{
            setLoading(false);
        }
    };

    const logoutUser = () => {
        setUser(null);
        navigate("/");
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
        toast("Até logo !")
    };

    const removeUser = async (
        userId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            setLoading(true);
            await api.delete(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(null);
            navigate("/");
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error);
                toast.error(error.response?.data.details)
            }else{
                console.error(error)
                toast.error("Erro interno, tente novamente em minutos")
            } 
        }finally{
            setLoading(false)
        }
    };

    const registerUserEmail = async (
        formData: ICreateUserEmail,
        userId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () =>void
    ) => {
        const token = localStorage.getItem("@TOKEN");
        if(token){
            try {
                setLoading(true);
                const {data} = await api.post(`/users/${userId}/email`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                reset();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {user, ...userEmail} = data;
                
                const newUserEmails = [
                    ...userEmails,
                    userEmail
                ];

                setUserEmails(newUserEmails);
                toast.success("Email adicionado");
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error(error);
                    toast.error(error.response?.data.details)
                }else{
                    console.error(error)
                    toast.error("Erro interno, tente novamente em minutos")
                } 
            } finally{
                setLoading(false)
            }
        }
    };

    const registerUserPhone = async (
        formData: ICreateUserPhone,
        userId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () =>void
    ) => {
        const token = localStorage.getItem("@TOKEN");
        if(token){
            try {
                setLoading(true);
                const {data} = await api.post(`/users/${userId}/phone`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                reset();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {user, ...userPhone} = data;
                
                const newUserPhones = [
                    ...userPhones,
                    userPhone
                ];

                setUserPhones(newUserPhones);
                toast.success("Telefone adicionado");
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error(error);
                    toast.error(error.response?.data.details)
                }else{
                    console.error(error)
                    toast.error("Erro interno, tente novamente em minutos")
                } 
            } finally{
                setLoading(false)
            }
        }
    };

    const removeUserInfo = async(
        info: "email" | "phone",
        userInfoId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,

    ) => {
        const requestSetter = {
            email: [userEmails, setUserEmails],
            phone: [userPhones, setUserPhones]
        };

        const token = localStorage.getItem("@TOKEN");

        if(token){
            try {
                setLoading(true);
                await api.delete(`/contacts/${userInfoId}/${info}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const newUserInfoList = requestSetter[info][0].filter((infoObj) => {
                    return infoObj.id !== userInfoId
                });

                requestSetter[info][1](newUserInfoList)
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error(error);
                    toast.error(error.response?.data.details)
                }else{
                    console.error(error)
                    toast.error("Erro interno, tente novamente em minutos")
                } 
            } finally{
                setLoading(false);
            }
        }
    };


    const editUser = async (
        formData: IEditUser,
        userId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            setLoading(true)
            const {data} = await api.patch(`/users/${userId}`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedUser = {
                ...user,
                ...data
            };

            setUser(updatedUser);


            toast.success("Perfil editado");
            
            setEditingUser(false);
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error);
                toast.error(error.response?.data.details)
            }else{
                console.error(error)
                toast.error("Erro interno, tente novamente em minutos")
            } 
        } finally{
            setLoading(false);
        }
    };


    return (
        <UserContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            loginUser,
            registerUser,
            userEmails,
            setUserEmails,
            userPhones,
            setUserPhones,
            logoutUser,
            editingUser,
            setEditingUser,
            removeUser,
            registerUserEmail,
            registerUserPhone,
            removeUserInfo,
            editUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
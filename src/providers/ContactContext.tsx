import { createContext, useEffect, useState } from "react"
import { IContact, IContactContext, ICreateContact, ICreateContactEmail, ICreateContactPhone, IEditContact, IFullContact } from "../interfaces/contact.interfaces";
import { api } from "../services/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ContactContext = createContext({} as IContactContext);

interface IContactContextProps{
    children: React.ReactNode
}

export const ContactProvider = ({children}: IContactContextProps) => {

    const [userContacts, setUserContacts] = useState<IContact[] | []>([]);

    const [userContact, setUserContact] = useState<IFullContact | null>(null);

    const [editingContact, setEditingContact] = useState<boolean>(false)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("@TOKEN");

        const getUserContacts = async() => {
            try {
                const {data} = await api.get("/contacts/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserContacts(data.contacts);
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error(error);
                    toast.error(error.response?.data.details)
                }else{
                    console.error(error)
                    toast.error("Erro interno, tente novamente em minutos")
                } 
            }

            
        };

        if(token) getUserContacts()
    }, []);

    const registerContact = async (
        formData: ICreateContact,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: ()=> void,
        setCreatingContact: React.Dispatch<React.SetStateAction<boolean>>
        ) => {
        const token = localStorage.getItem("@TOKEN");
        try {
            setLoading(true);
            await api.post("/contacts", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            reset();
            toast.success("Contato registrado");
            setCreatingContact(false);
            navigate(0);

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

    const retrieveContact = async (
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setLookingContact: React.Dispatch<React.SetStateAction<boolean>>,
        contactId: string
    ) => {
        const token = localStorage.getItem("@TOKEN");
        if(token){

            try {
                setLookingContact(true)
                setLoading(true)
                const {data} = await api.get(`/contacts/${contactId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserContact(data)
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
        }
    };

    const registerContactEmail = async (
        formData: ICreateContactEmail,
        contactId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () =>void
    ) => {
        const token = localStorage.getItem("@TOKEN");
        if(token){
            try {
                setLoading(true);
                const {data} = await api.post(`/contacts/${contactId}/email`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                reset();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {contact, ...contactEmail} = data;
                
                const newContactEmailList = [
                    ...userContact!.contactEmails,
                    contactEmail
                ];

                const updatedUserContact = {
                    ...userContact!,
                    contactEmails: newContactEmailList
                };

                setUserContact(updatedUserContact);
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
    }
    
    const registerContactPhone = async (
        formData: ICreateContactPhone,
        contactId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () =>void
    ) => {
        const token = localStorage.getItem("@TOKEN");
        if(token){
            try {
                setLoading(true);
                const {data} = await api.post(`/contacts/${contactId}/phone`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                reset();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {contact, ...contactPhone} = data;
                
                const newContactPhoneList = [
                    ...userContact!.contactPhones,
                    contactPhone
                ];

                const updatedUserContact = {
                    ...userContact!,
                    contactPhones: newContactPhoneList
                };

                setUserContact(updatedUserContact);
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

    const removeContactInfo = async(
        info: "email" | "phone",
        contactInfoId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,

    ) => {
        const requestSetter = {
            email: [userContact!.contactEmails, "contactEmails"],
            phone: [userContact!.contactPhones, "contactPhones"]
        };

        const token = localStorage.getItem("@TOKEN");

        if(token){
            try {
                setLoading(true);
                await api.delete(`/contacts/${contactInfoId}/${info}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const newContactInfoList = requestSetter[info][0].filter((infoObj) => {
                    return infoObj.id !== contactInfoId
                });

                const newUserContact = {
                    ...userContact!,
                    [requestSetter[info][1]]: newContactInfoList
                };

                setUserContact(newUserContact);
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
    }

    const editContact = async (
        formData: IEditContact,
        contactId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setEditingContact: React.Dispatch<React.SetStateAction<boolean>>

    ) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            setLoading(true)
            const {data} = await api.patch(`/contacts/${contactId}`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedContact = {
                ...userContact,
                ...data
            };

            setUserContact({...userContact, ...updatedContact});

            toast.success("Contato editado");
            
            const newUserContacts = userContacts.map((contact) => {
                if(contact.id === data.id){
                    return {
                        id: data.id,
                        name: data.name
                    }
                } else{
                    return contact
                }
            })
            setUserContacts(newUserContacts);
            setEditingContact(false);
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

    const removeContact = async (
        contactId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setLookingContact: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            setLoading(true);
            await api.delete(`/contacts/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const newUserContacts = userContacts.filter((contact) =>{
                return contact.id !== contactId
            });

            setUserContacts(newUserContacts);
            setUserContact(null);
            setLookingContact(false);
            setEditingContact(false);
            toast.success("Contato excluído");
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
    }

    return(
        <ContactContext.Provider value={{
            userContacts,
            setUserContacts,
            userContact,
            setUserContact,
            registerContact,
            retrieveContact,
            registerContactEmail,
            registerContactPhone,
            removeContactInfo,
            editContact,
            editingContact,
            setEditingContact,
            removeContact
        }}>
            {children}
        </ContactContext.Provider>
    )
};
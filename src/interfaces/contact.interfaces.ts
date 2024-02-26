import { z } from "zod";
import { contactEmailsSchema, contactPhonesSchema, contactSchema, createContactEmailSchema, createContactPhoneSchema, createContactSchema, editContactSchema, fullContactSchema } from "../schemas/contact.schema";

export type IContact = z.infer<typeof contactSchema>;
export type IFullContact = z.infer<typeof fullContactSchema>;
export type ICreateContact = z.infer<typeof createContactSchema>;
export type IContactEmails = z.infer<typeof contactEmailsSchema>;
export type IContactPhones = z.infer<typeof contactPhonesSchema>;
export type ICreateContactEmail = z.infer<typeof createContactEmailSchema>;
export type ICreateContactPhone = z.infer<typeof createContactPhoneSchema>;
export type IEditContact = z.infer<typeof editContactSchema>;

export interface IContactContext{
    userContacts: IContact[] | []
    setUserContacts: React.Dispatch<React.SetStateAction<[] | IContact[]>>
    userContact: IFullContact | null;
    setUserContact: React.Dispatch<React.SetStateAction<IFullContact | null>>

    registerContact: (
        formData: ICreateContact, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void,
        setCreatingContact: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>

    retrieveContact: (
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setLookingContact: React.Dispatch<React.SetStateAction<boolean>>,
        contactId: string
    ) => Promise<void>

    registerContactEmail: (
        formData: ICreateContactEmail,
        contactId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void) => Promise<void>

    registerContactPhone: (
        formData: ICreateContactPhone,
        contactId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void
    ) => Promise<void>

    removeContactInfo: (
        info: "email" | "phone",
        contactInfoId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>

    editContact: (
        formData: IEditContact,
        contactId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        editingContact: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>

    editingContact: boolean,
    setEditingContact: React.Dispatch<React.SetStateAction<boolean>>

    removeContact: (
        contactId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setLookingContact: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>
}


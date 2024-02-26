import { z } from "zod";
import { UserSchema, createUserEmailSchema, createUserPhoneSchema, editUserSchema, userEmailSchema, userLoginSchema, userPhoneSchema, userRegisterSchema } from "../schemas/user.schemas";

export type IUserLogin = z.infer<typeof userLoginSchema>;
export type IUser = z.infer<typeof UserSchema>;
export type IUserRegister = z.infer<typeof userRegisterSchema>;
export type IUserEmail = z.infer<typeof userEmailSchema>;
export type IUserPhone = z.infer<typeof userPhoneSchema>;
export type ICreateUserEmail = z.infer<typeof createUserEmailSchema>;
export type ICreateUserPhone = z.infer<typeof createUserPhoneSchema>;
export type IEditUser = z.infer<typeof editUserSchema>;

export interface IUserContext{
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null> >
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>

    loginUser: (
        formData: IUserLogin,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void
    ) => Promise<void>
    
    registerUser: (
        formData: IUserRegister,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void
    ) => Promise<void>

    userEmails: [] | IUserEmail[]
    setUserEmails: React.Dispatch<React.SetStateAction<[] | IUserEmail[]>>

    userPhones: [] | IUserPhone[]
    setUserPhones: React.Dispatch<React.SetStateAction<[] | IUserPhone[]>>

    logoutUser: () => void

    editingUser: boolean,
    setEditingUser: React.Dispatch<React.SetStateAction<boolean>>

    removeUser: (
        userId: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>

    registerUserEmail: (
        formData: ICreateUserEmail,
        userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void
    ) => Promise<void>

    removeUserInfo: (
        info: "email" | "phone",
        userInfoId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>

    registerUserPhone: (
        formData: ICreateUserPhone,
        userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        reset: () => void
    ) => Promise<void>

    editUser: (
        formData: IEditUser,
        userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>
}

export interface IUserProviderProps{
    children: React.ReactNode
}

export interface IUserLoginResponse{
    token: string,
    user: IUser
}
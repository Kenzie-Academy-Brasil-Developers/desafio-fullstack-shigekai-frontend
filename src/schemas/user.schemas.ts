import { z } from "zod";

export const userLoginSchema = z.object({
    email: z
    .string()
    .email("Email inválido")
    .min(1, "Insira um Email")
    .max(120, "Email muito longo"),

    password: z
    .string()
    .min(1, "Insira uma senha")
    .max(256, "Senha muito longa")
});

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.string()
});

export const userRegisterSchema = z.object({
    name: z
    .string()
    .max(120, "Nome muito longo")
    .min(1, "Insira seu nome"),

    email: z
    .string()
    .email("Email inválido")
    .min(1, "Insira um Email")
    .max(120, "Email muito longo"),

    password: z
    .string()
    .min(1, "Insira uma senha")
    .max(256, "Senha muito longa"),

    phone: z
    .string()
    .min(1, "Insira seu telefone")
    .max(16, "Telefone não pode exceder 16 caracteres")

});

export const userEmailSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    main: z.boolean(),
    updatedAt: z.string()
});

export const userPhoneSchema = z.object({
    id: z.string().uuid(),
    phone: z.string().max(16),
    updatedAt: z.string()
});

export const createUserEmailSchema = userLoginSchema.pick({
    email: true
});

export const createUserPhoneSchema = userRegisterSchema.pick({
    phone: true
});

export const editUserSchema = userRegisterSchema.pick({
    name: true,
    password: true
}).partial();
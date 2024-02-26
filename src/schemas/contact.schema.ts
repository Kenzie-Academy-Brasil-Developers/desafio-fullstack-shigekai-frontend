import { z } from "zod";

export const contactSchema = z.object({
    id: z.string().uuid(),
    name: z.string()
});

export const fullContactSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    contactEmails: z.array(z.object({
        id: z.string(),
        email: z.string().email(),
        updatedAt: z.string()
    })),
    contactPhones: z.array(z.object({
        id: z.string(),
        phone: z.string(),
        updatedAt: z.string()
    }))
});

export const contactEmailsSchema = fullContactSchema.pick({
    contactEmails: true
});
export const contactPhonesSchema = fullContactSchema.pick({
    contactPhones: true
});

export const createContactSchema = z.object({
    name: z
    .string()
    .min(1, "Insira um nome")
    .max(120, "Nome muito longo"),

    email: z
    .string()
    .email()
    .min(1, "Insira um emai")
    .max(120, "Email muito longo"),

    phone: z
    .string()
    .min(1, "Insira um telefone")
    .max(16, "Telefone muito longo"),

    description: z
    .string()
    .min(1, "Insira uma descrição")
});

export const createContactEmailSchema = createContactSchema.pick({
    email: true
});

export const createContactPhoneSchema = createContactSchema.pick({
    phone: true
});

export const editContactSchema = createContactSchema.pick({
    name: true,
    description: true
}).partial();
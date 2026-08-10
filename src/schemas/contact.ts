import { z } from "zod";

export const contactMessageSchema = z.object({
	name: z.string().min(2, "Informe seu nome."),
	email: z.email("Informe um e-mail válido."),
	phone: z.string().optional(),
	company: z.string().optional(),
	message: z.string().min(10, "Escreva um pouco mais sobre sua necessidade."),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

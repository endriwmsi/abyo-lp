import { createServerFn } from "@tanstack/react-start";
import { requireEnv } from "#/lib/env";
import { sendEmail } from "#/lib/resend";
import { contactMessageSchema } from "../schemas/contact";

// Landing page pública — sem autenticação. Envia o lead direto pro e-mail
// transacional configurado (RESEND_FROM_EMAIL), com replyTo pro remetente
// pra facilitar resposta direta pelo time comercial.
export const sendContactMessage = createServerFn({ method: "POST" })
	.validator(contactMessageSchema)
	.handler(async ({ data }) => {
		const to = requireEnv("RESEND_FROM_EMAIL");

		const html = `
			<h2>Novo contato pelo site — Abyo</h2>
			<p><strong>Nome:</strong> ${data.name}</p>
			<p><strong>E-mail:</strong> ${data.email}</p>
			${data.phone ? `<p><strong>Telefone:</strong> ${data.phone}</p>` : ""}
			${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ""}
			<p><strong>Mensagem:</strong></p>
			<p>${data.message.replace(/\n/g, "<br />")}</p>
		`;

		await sendEmail({
			to,
			subject: `Novo contato: ${data.name}`,
			html,
			replyTo: data.email,
		});

		return { success: true };
	});

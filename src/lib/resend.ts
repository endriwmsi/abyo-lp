import { Resend } from "resend";
import { requireEnv } from "./env";

let client: Resend | undefined;

function getClient() {
	if (!client) {
		client = new Resend(requireEnv("RESEND_API_KEY"));
	}
	return client;
}

export async function sendEmail(options: {
	to: string;
	subject: string;
	html: string;
	replyTo?: string;
}) {
	const resend = getClient();
	const from = requireEnv("RESEND_FROM_EMAIL");

	const { error } = await resend.emails.send({
		from,
		to: options.to,
		subject: options.subject,
		html: options.html,
		replyTo: options.replyTo,
	});

	if (error) {
		throw new Error(`Falha ao enviar e-mail via Resend: ${error.message}`);
	}
}

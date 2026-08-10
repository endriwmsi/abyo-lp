import { IconBrandWhatsapp } from "@tabler/icons-react";
import { ClockIcon, MailIcon } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Glow } from "./decorative";
import { Reveal } from "./reveal";
import { Button } from "./ui/button";

// Lê `import.meta.env` direto (em vez de `#/env`) — a landing pública não
// pode depender da validação de todos os secrets do servidor (DATABASE_URL,
// Woovi, S3, VAPID) só pra ler um número de WhatsApp opcional do client.
function buildWhatsappUrl(): string | null {
	const number = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER as
		| string
		| undefined;
	if (!number) return null;

	const text = "Olá! Quero conhecer a plataforma Abyo pra minha empresa.";
	return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function ContactSection({
	prefillMessage,
}: {
	prefillMessage?: string;
}) {
	const whatsappUrl = buildWhatsappUrl();

	return (
		<section id="contato" className="relative py-16 sm:py-20">
			<Glow className="-bottom-32 left-1/2 h-120 w-120 -translate-x-1/2 opacity-[0.14]" />

			<div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
				<Reveal>
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						Contato
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						Vamos colocar sua{" "}
						<span className="text-primary">operação no ar</span>
					</h2>
					<p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
						Conte um pouco sobre sua operação e nosso time volta com uma
						demonstração personalizada, sem compromisso.
					</p>

					<div className="mt-8 space-y-4">
						<div className="flex items-center gap-3 text-sm text-muted-foreground">
							<span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
								<ClockIcon className="size-4" />
							</span>
							Resposta em até 1 dia útil
						</div>
						<div className="flex items-center gap-3 text-sm text-muted-foreground">
							<span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
								<MailIcon className="size-4" />
							</span>
							Direto com o nosso time comercial
						</div>
					</div>

					{whatsappUrl && (
						<Button variant="outline" className="mt-8" asChild>
							<a href={whatsappUrl} target="_blank" rel="noreferrer">
								<IconBrandWhatsapp className="size-4" />
								Falar no WhatsApp
							</a>
						</Button>
					)}
				</Reveal>

				<Reveal
					delay={0.1}
					className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl sm:p-8"
				>
					<ContactForm prefillMessage={prefillMessage} />
				</Reveal>
			</div>
		</section>
	);
}

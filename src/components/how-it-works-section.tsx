import {
	CreditCardIcon,
	LayoutGridIcon,
	UsersRoundIcon,
	Volume2Icon,
} from "lucide-react";
import { Reveal } from "./reveal";

const STEPS = [
	{
		icon: LayoutGridIcon,
		title: "Configure seu catálogo",
		description:
			"Monte os serviços que vai revender com formulários dinâmicos, campo a campo — sem programação.",
	},
	{
		icon: UsersRoundIcon,
		title: "Monte sua equipe",
		description:
			"Crie seats com permissões sob medida: financeiro, operação, suporte — cada um vê só o que precisa.",
	},
	{
		icon: Volume2Icon,
		title: "Sua rede indica e vende",
		description:
			"Members convidam parceiros, você executa o serviço e fatura. A comissão sobe automática sobre a venda paga, até 10 níveis, sem planilha.",
	},
	{
		icon: CreditCardIcon,
		title: "Receba e opere",
		description:
			"Solicitações pagas via PIX, documentos assinados digitalmente — tudo acompanhado em um painel só.",
	},
];

export function HowItWorksSection() {
	return (
		<section id="como-funciona" className="relative py-16 sm:py-20">
			<div className="mx-auto max-w-7xl px-6">
				<Reveal className="mx-auto max-w-2xl text-center">
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						Como funciona
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						Do catálogo à comissão,{" "}
						<span className="text-primary">em quatro passos</span>
					</h2>
				</Reveal>

				<div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div
						aria-hidden
						className="absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-white/15 to-transparent lg:block"
					/>
					{STEPS.map((step, index) => (
						<Reveal key={step.title} delay={index * 0.1} className="relative">
							<div className="flex items-center gap-3">
								<span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-primary">
									<step.icon className="size-5" />
								</span>
								<span className="font-display text-3xl text-white/10">
									0{index + 1}
								</span>
							</div>
							<h3 className="mt-5 font-medium text-foreground">{step.title}</h3>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								{step.description}
							</p>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

import {
	FileSignatureIcon,
	LayoutGridIcon,
	NetworkIcon,
	QrCodeIcon,
	ShieldCheckIcon,
	SlidersHorizontalIcon,
} from "lucide-react";
import { Glow } from "./decorative";
import { Reveal } from "./reveal";

const FEATURES = [
	{
		icon: LayoutGridIcon,
		title: "Catálogo configurável",
		description:
			"Form builder com campos dinâmicos por serviço. Monte novos produtos sem depender de programação.",
	},
	{
		icon: NetworkIcon,
		title: "Rede multinível",
		description:
			"Members indicam members. Comissão calculada e distribuída automaticamente até 10 níveis de profundidade.",
	},
	{
		icon: QrCodeIcon,
		title: "Pagamento PIX integrado",
		description:
			"Cobranças avulsas ou em lote via Woovi e Asaas, com confirmação automática por webhook — sem conciliação manual.",
	},
	{
		icon: FileSignatureIcon,
		title: "Assinatura pública de documentos",
		description:
			"O cliente final preenche e assina o documento direto pelo link, sem precisar criar conta.",
	},
	{
		icon: ShieldCheckIcon,
		title: "RBAC granular",
		description:
			"Roles como linhas de banco, editáveis em tempo real. Permissão fina por recurso e por ação.",
	},
	{
		icon: SlidersHorizontalIcon,
		title: "Painel administrativo completo",
		description:
			"Campanhas, financeiro, clientes, equipe e rede — tudo num só painel, sob controle da sua operação.",
	},
];

export function FeaturesSection() {
	return (
		<section id="beneficios" className="relative py-16 sm:py-20">
			<Glow className="-left-40 top-1/3 h-96 w-96 opacity-[0.12]" />

			<div className="relative mx-auto max-w-7xl px-6">
				<Reveal className="mx-auto max-w-2xl text-center">
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						Benefícios
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						Tudo que sua operação de revenda precisa,{" "}
						<span className="text-primary">num único lugar</span>
					</h2>
					<p className="mt-4 text-muted-foreground leading-relaxed">
						Nada de planilhas soltas, grupos de WhatsApp e cobrança manual. Uma
						plataforma única para catálogo, rede, pagamento e documentos.
					</p>
				</Reveal>

				<div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature, index) => (
						<Reveal
							key={feature.title}
							delay={(index % 3) * 0.08}
							className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 shadow-xl shadow-black/20 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white/5"
						>
							<span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
								<feature.icon className="size-5" />
							</span>
							<h3 className="mt-5 font-medium text-foreground">
								{feature.title}
							</h3>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

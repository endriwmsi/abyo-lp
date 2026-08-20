import { PlugIcon, SearchIcon } from "lucide-react";
import { Glow } from "./decorative";
import { Reveal } from "./reveal";

const ROADMAP_ITEMS = [
	{
		icon: SearchIcon,
		title: "Consultas integradas",
		description:
			"Bacen, CPF, CNPJ e outras bases direto na plataforma. Sem sair do sistema pra consultar.",
	},
	{
		icon: PlugIcon,
		title: "API para CRMs",
		description:
			"Conecte a Abyo às ferramentas que a sua empresa já usa, sem trocar de tela.",
	},
];

export function RoadmapSection() {
	return (
		<section id="roadmap" className="relative py-16 sm:py-20">
			<Glow className="-right-40 top-1/3 h-96 w-96 opacity-[0.1]" />

			<div className="relative mx-auto max-w-7xl px-6">
				<Reveal className="mx-auto max-w-2xl text-center">
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						Roadmap
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						O que vem por aí
					</h2>
					<p className="mt-4 text-muted-foreground leading-relaxed">
						Funcionalidades em desenvolvimento, sem data fechada.
					</p>
				</Reveal>

				<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
					{ROADMAP_ITEMS.map((item, index) => (
						<Reveal
							key={item.title}
							delay={index * 0.08}
							className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 shadow-xl shadow-black/20"
						>
							<div className="flex items-center justify-between">
								<span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<item.icon className="size-5" />
								</span>
								<span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
									No roadmap
								</span>
							</div>
							<h3 className="mt-5 font-medium text-foreground">{item.title}</h3>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								{item.description}
							</p>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

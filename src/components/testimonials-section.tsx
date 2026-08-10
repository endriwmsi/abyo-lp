import { StarIcon } from "lucide-react";
import { Reveal } from "./reveal";

interface Testimonial {
	quote: string;
	name: string;
	role: string;
}

const ROW_1: Testimonial[] = [
	{
		quote:
			"A rede de indicação automatizou o que a gente fazia na planilha. Em um mês já tínhamos comissão rodando sozinha até o nível 5.",
		name: "Camila Duarte",
		role: "Sócia-fundadora",
	},
	{
		quote:
			"O catálogo configurável foi o que fechou pra gente. Montamos os serviços em um dia, sem precisar de desenvolvedor.",
		name: "Rafael Tavares",
		role: "Head de Operações",
	},
	{
		quote:
			"PIX automático mudou o jogo. Antes cobrávamos manual, hoje o cliente paga e o status muda sozinho.",
		name: "Juliana Prado",
		role: "Gerente Financeira",
	},
	{
		quote:
			"Consegui dar acesso pro time sem medo — cada um vê só o que precisa. RBAC bem pensado.",
		name: "Marcos Vieira",
		role: "Diretor de Tecnologia",
	},
];

const ROW_2: Testimonial[] = [
	{
		quote:
			"Migramos de grupo de WhatsApp pra plataforma em duas semanas. A rede não perdeu ritmo.",
		name: "Fernanda Lopes",
		role: "Coordenadora Comercial",
	},
	{
		quote:
			"A assinatura pública dos documentos tirou um gargalo enorme do processo com o cliente final.",
		name: "Bruno Castilho",
		role: "Head de Vendas",
	},
	{
		quote:
			"Onboarding assistido fez toda diferença — em um mês a operação já estava rodando redondo.",
		name: "Patrícia Nunes",
		role: "CEO",
	},
	{
		quote:
			"Ter white-label de verdade, com nossa marca em tudo, foi decisivo na escolha.",
		name: "Diego Almeida",
		role: "Sócio-diretor",
	},
];

function getInitials(name: string) {
	const parts = name.trim().split(/\s+/);
	return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`;
}

function TestimonialCard({ quote, name, role }: Testimonial) {
	return (
		<div className="w-80 shrink-0 rounded-2xl border border-white/10 bg-white/3 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl sm:w-96">
			<div className="flex gap-0.5">
				{Array.from({ length: 5 }).map((_, index) => (
					<StarIcon
						// biome-ignore lint/suspicious/noArrayIndexKey: 5 estrelas fixas, ordem nunca muda
						key={index}
						className="size-4 fill-primary text-primary"
					/>
				))}
			</div>
			<p className="mt-4 text-muted-foreground text-sm leading-relaxed">
				“{quote}”
			</p>
			<div className="mt-5 flex items-center gap-3">
				<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-medium text-primary text-sm">
					{getInitials(name)}
				</span>
				<div>
					<p className="font-semibold text-foreground text-sm">{name}</p>
					<p className="text-muted-foreground text-xs">{role}</p>
				</div>
			</div>
		</div>
	);
}

function TestimonialRow({
	items,
	reverse = false,
}: {
	items: Testimonial[];
	reverse?: boolean;
}) {
	const track = [...items, ...items];

	return (
		<div className="relative overflow-hidden">
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-32" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-32" />

			<div
				className={
					reverse
						? "marquee-track-reverse flex w-max gap-5"
						: "marquee-track flex w-max gap-5"
				}
			>
				{track.map((item, index) => (
					<TestimonialCard
						// biome-ignore lint/suspicious/noArrayIndexKey: lista estática duplicada pro loop do carrossel, ordem nunca muda
						key={`${item.name}-${index}`}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}

export function TestimonialsSection() {
	return (
		<section className="relative py-16 sm:py-20">
			<div className="mx-auto max-w-2xl px-6 text-center">
				<Reveal>
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						Depoimentos
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						Quem já está{" "}
						<span className="text-primary">revendendo com a Abyo</span>
					</h2>
				</Reveal>
			</div>

			<Reveal delay={0.1} className="mt-12 space-y-5">
				<TestimonialRow items={ROW_1} />
				<TestimonialRow items={ROW_2} reverse />
			</Reveal>
		</section>
	);
}

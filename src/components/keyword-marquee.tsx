const KEYWORDS = [
	"Rede multinível",
	"Comissão automática",
	"Catálogo configurável",
	"Pagamento PIX",
	"RBAC granular",
	"Assinatura digital",
	"White-label",
	"Woovi & Asaas",
];

const TRACK = [...KEYWORDS, ...KEYWORDS];

export function KeywordMarquee() {
	return (
		<div className="relative overflow-hidden border-white/10 border-y py-6">
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent sm:w-40" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent sm:w-40" />

			<div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
				{TRACK.map((word, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: lista estática duplicada pro loop do marquee, ordem nunca muda
					<span key={`${word}-${index}`} className="flex items-center gap-6">
						<span
							className={
								index % 2 === 0
									? "font-display text-foreground/90 text-lg sm:text-xl"
									: "font-display text-lg text-muted-foreground/40 sm:text-xl"
							}
						>
							{word}
						</span>
						<span className="text-primary/50">•</span>
					</span>
				))}
			</div>
		</div>
	);
}

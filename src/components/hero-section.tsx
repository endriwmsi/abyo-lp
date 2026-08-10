import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Glow, GridPattern } from "./decorative";
import { HeroMockup } from "./hero-mockup";
import LightRays from "./light-rays";
import { Button } from "./ui/button";

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function HeroSection() {
	return (
		<section id="top" className="relative pt-24">
			<div className="relative mx-auto px-4 sm:px-6">
				<div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black px-6 pt-20 pb-12 sm:px-10 sm:pt-24 sm:mb-16 max-h-screen">
					<div className="absolute inset-0 z-0 left-0 right-0 w-full">
						<LightRays
							raysOrigin="top-center"
							raysColor="#39D59F"
							raysSpeed={1}
							lightSpread={1}
							rayLength={2}
							pulsating={false}
							fadeDistance={1}
							saturation={1}
							followMouse
							mouseInfluence={0.1}
							noiseAmount={0}
							distortion={0}
						/>
					</div>
					<GridPattern />
					<Glow className="-top-40 left-1/2 h-140 w-140 -translate-x-1/2 opacity-40" />
					<Glow className="top-32 -right-30 h-72 w-72 opacity-20" />

					<div className="relative mx-auto max-w-7xl text-center">
						<motion.div {...fadeUp(0)}>
							<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-xs text-muted-foreground">
								<span className="size-1.5 animate-pulse rounded-full bg-primary" />
								Plataforma white-label de recuperação de crédito
							</span>
						</motion.div>

						<motion.h1
							{...fadeUp(0.1)}
							className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
						>
							Transforme sua rede de indicação numa{" "}
							<span className="text-primary">máquina de revenda</span> de
							crédito.
						</motion.h1>

						<motion.p
							{...fadeUp(0.2)}
							className="mx-auto mt-6 max-w-4xl text-base text-muted-foreground leading-relaxed sm:text-lg"
						>
							Catálogo de serviços, rede de indicação com comissão automática
							até 10 níveis, pagamento PIX e assinatura digital de documentos —
							tudo numa instalação exclusiva, com a sua marca.
						</motion.p>

						<motion.div
							{...fadeUp(0.3)}
							className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
						>
							<Button size="lg" className="group rounded-full" asChild>
								<a href="#contato">
									Agendar demonstração
									<ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
								</a>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="rounded-full"
								asChild
							>
								<a href="#precos">Ver planos</a>
							</Button>
						</motion.div>
					</div>

					<div className="relative z-10 mx-auto mt-16 max-w-6xl sm:mt-12">
						<HeroMockup />
					</div>
				</div>
			</div>
		</section>
	);
}

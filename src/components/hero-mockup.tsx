import { motion } from "framer-motion";
import { ArrowUpRightIcon, QrCodeIcon } from "lucide-react";

export function HeroMockup() {
	return (
		<div className="relative">
			<motion.div
				aria-hidden
				initial={{ opacity: 0.5 }}
				animate={{ opacity: [0.45, 0.85, 0.45] }}
				transition={{
					duration: 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				className="absolute -inset-6 rounded-[2.5rem] bg-primary/25 blur-3xl"
			/>

			<motion.div
				initial={{ scale: 0.94, y: 20 }}
				animate={{ scale: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
				className="relative overflow-hidden rounded-lg border-x border-t-2 border-b-0 border-primary bg-white/3 shadow-[0_0_100px_-15px] shadow-primary/50 backdrop-blur-2xl"
			>
				<picture>
					<source
						type="image/avif"
						srcSet="/assets/images/lp-hero-dashboard-750.avif 750w, /assets/images/lp-hero-dashboard.avif 1440w"
						sizes="(max-width: 768px) 100vw, 1152px"
					/>
					<source
						type="image/webp"
						srcSet="/assets/images/lp-hero-dashboard-750.webp 750w, /assets/images/lp-hero-dashboard.webp 1440w"
						sizes="(max-width: 768px) 100vw, 1152px"
					/>
					<img
						src="/assets/images/lp-hero-dashboard.jpg"
						srcSet="/assets/images/lp-hero-dashboard-750.jpg 750w, /assets/images/lp-hero-dashboard.jpg 1440w"
						sizes="(max-width: 768px) 100vw, 1152px"
						alt="Painel Abyo — comissões, rede de indicação e solicitações pagas"
						width={1440}
						height={923}
						fetchPriority="high"
						decoding="async"
						className="aspect-auto w-full rounded-lg bg-linear-to-br from-primary/15 via-white/3 to-transparent object-cover"
					/>
				</picture>
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black to-transparent"
				/>
				<span className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/70 backdrop-blur-sm">
					Ambiente de demonstração
				</span>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -20, y: 10 }}
				animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
				transition={{
					opacity: { duration: 0.6, delay: 1 },
					x: { duration: 0.6, delay: 1 },
					y: { duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1.4 },
				}}
				className="-left-6 absolute top-14 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
			>
				<span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
					<QrCodeIcon className="size-4" />
				</span>
				<div className="text-xs">
					<p className="font-medium text-foreground">PIX confirmado</p>
					<p className="text-muted-foreground">via Woovi · agora</p>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: 20, y: 10 }}
				animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
				transition={{
					opacity: { duration: 0.6, delay: 1.2 },
					x: { duration: 0.6, delay: 1.2 },
					y: { duration: 4.5, repeat: Number.POSITIVE_INFINITY, delay: 1.6 },
				}}
				className="-right-4 sm:-right-8 absolute bottom-6 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
			>
				<span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
					<ArrowUpRightIcon className="size-4" />
				</span>
				<div className="text-xs">
					<p className="font-medium text-foreground">Nova indicação</p>
					<p className="text-muted-foreground">nível 2 · comissão gerada</p>
				</div>
			</motion.div>
		</div>
	);
}

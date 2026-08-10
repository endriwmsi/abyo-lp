import { ArrowRightIcon, CheckIcon, SparklesIcon, XIcon } from "lucide-react";
import {
	isFeatureIncluded,
	LANDING_PLANS,
	PLAN_FEATURE_ROWS,
} from "#/lib/plans-data";
import { cn } from "#/lib/utils";
import { Glow } from "./decorative";
import { Reveal } from "./reveal";
import { Button } from "./ui/button";

export function PlansSection({
	onBookCall,
}: {
	onBookCall: (message: string) => void;
}) {
	return (
		<section id="precos" className="relative py-16 sm:py-20">
			<Glow className="-right-40 top-1/4 h-105 w-105 opacity-[0.14]" />

			<div className="relative mx-auto max-w-360 px-6">
				<Reveal className="mx-auto max-w-2xl text-center">
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						Preços
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						Um plano pro tamanho da{" "}
						<span className="text-primary">sua operação</span>
					</h2>
					<p className="mt-4 text-muted-foreground leading-relaxed">
						Seats, limite de membros e condições comerciais são ajustados numa
						call de 20 minutos com o nosso time — sem tabela fixa, sem proposta
						genérica.
					</p>
				</Reveal>

				<div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
					{LANDING_PLANS.map((plan, planIndex) => (
						<Reveal
							key={plan.id}
							delay={planIndex * 0.06}
							className={cn(
								"relative flex flex-col rounded-2xl border p-6 shadow-xl shadow-black/20 transition-transform hover:-translate-y-1",
								plan.highlight
									? "border-primary/40 bg-linear-to-b from-primary/10 to-white/2 shadow-[0_0_60px_-15px] shadow-primary/30"
									: "border-white/10 bg-white/3",
							)}
						>
							{plan.highlight && (
								<span className="-top-3 absolute left-6 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
									<SparklesIcon className="size-3" />
									Mais popular
								</span>
							)}

							<h3 className="font-display text-xl text-foreground">
								{plan.name}
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								{plan.tagline}
							</p>

							<div className="mt-5 flex flex-wrap gap-2">
								<span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted-foreground">
									{plan.seats}
								</span>
								<span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted-foreground">
									{plan.members}
								</span>
							</div>

							<ul className="mt-5 flex-1 space-y-2">
								{PLAN_FEATURE_ROWS.map((row) => {
									const included = isFeatureIncluded(planIndex, row);
									return (
										<li
											key={row.label}
											className={cn(
												"flex items-start gap-2 text-sm",
												included
													? "text-muted-foreground"
													: "text-muted-foreground/40",
											)}
										>
											{included ? (
												<CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
											) : (
												<XIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
											)}
											{row.label}
										</li>
									);
								})}
							</ul>

							<Button
								className="group mt-8"
								variant={plan.highlight ? "default" : "outline"}
								onClick={() =>
									onBookCall(
										`Quero saber mais sobre o plano ${plan.name} e agendar uma call.`,
									)
								}
							>
								Falar sobre o plano
								<ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
							</Button>
						</Reveal>
					))}
				</div>

				<Reveal delay={0.3} className="mt-10 text-center">
					<p className="text-muted-foreground text-sm">
						Não sabe qual plano se encaixa?{" "}
						<button
							type="button"
							onClick={() =>
								onBookCall(
									"Quero agendar uma call pra entender qual plano se encaixa na minha operação.",
								)
							}
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Agende uma call e a gente descobre junto
						</button>
						.
					</p>
				</Reveal>
			</div>
		</section>
	);
}

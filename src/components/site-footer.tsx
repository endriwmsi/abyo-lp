import { Link } from "@tanstack/react-router";
import type * as React from "react";
import Logo from "./logo";

const COLUMNS = [
	{
		title: "Produto",
		links: [
			{ href: "#beneficios", label: "Benefícios" },
			{ href: "#como-funciona", label: "Como funciona" },
			{ href: "#precos", label: "Preços" },
			{ href: "#faq", label: "FAQ" },
		],
	},
];

export function SiteFooter() {
	return (
		<footer className="relative bg-background pt-8 pb-48">
			<div className="relative mx-auto max-w-360 px-6">
				<span
					aria-hidden
					className="metallic-text pointer-events-none absolute inset-x-0 -bottom-40 z-0 select-none text-center font-display text-[4.5rem] leading-none sm:text-[8rem] lg:text-[12rem] mb-10"
					style={{ "--duration": "6s" } as React.CSSProperties}
				>
					AbyoApp
				</span>

				<div className="relative z-10 rounded-xl border border-white/10 bg-background/70 p-8 shadow-2xl backdrop-blur-lg sm:p-10">
					<div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
						<div className="max-w-xs">
							<a href="#top" className="flex items-center gap-2">
								<Logo variant="compact" className="size-7" />
								<span className="font-display text-foreground tracking-tight">
									Abyo
								</span>
							</a>
							<p className="mt-4 text-muted-foreground text-sm leading-relaxed">
								Plataforma white-label de revenda de serviços de recuperação de
								crédito, com rede de indicação, catálogo configurável e
								pagamento PIX.
							</p>
						</div>

						<div className="flex flex-wrap gap-16">
							{COLUMNS.map((column) => (
								<div key={column.title}>
									<h4 className="text-foreground text-sm font-medium">
										{column.title}
									</h4>
									<ul className="mt-4 space-y-2.5">
										{column.links.map((link) => (
											<li key={link.href}>
												<a
													href={link.href}
													className="text-muted-foreground text-sm transition-colors hover:text-foreground"
												>
													{link.label}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}

							<div>
								<h4 className="text-foreground text-sm font-medium">Legal</h4>
								<ul className="mt-4 space-y-2.5">
									<li>
										<Link
											to="/"
											className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										>
											Termos e condições
										</Link>
									</li>
									<li>
										<Link
											to="/"
											className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										>
											Política de privacidade
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="mt-16 border-white/10 border-t pt-8 text-center">
						<p className="text-muted-foreground text-xs">
							© {new Date().getFullYear()} Abyo. Todos os direitos reservados.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

import { Link } from "@tanstack/react-router";
import { Glow, GridPattern } from "#/components/decorative";
import Logo from "#/components/logo";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export function NotFound() {
	return (
		<main className="landing-root dark relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-24 text-foreground antialiased">
			<GridPattern />
			<Glow className="-translate-x-1/2 top-0 left-1/2 size-125" />

			<div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
				<Link to="/" className="mb-8 flex items-center gap-2">
					<Logo variant="compact" className="size-8" />
					<span className="font-display text-foreground tracking-tight">
						Abyo
					</span>
				</Link>

				<Card className="w-full border-white/10 bg-background/70 shadow-2xl backdrop-blur-lg">
					<CardContent className="flex flex-col items-center gap-3 px-8">
						<span className="font-display text-6xl text-primary tracking-tight">
							404
						</span>
						<h1 className="font-display text-foreground text-xl tracking-tight">
							Página não encontrada
						</h1>
						<p className="text-muted-foreground text-sm leading-relaxed">
							A página que você procura não existe ou foi movida para outro
							endereço.
						</p>

						<Button asChild size="lg" className="mt-4 w-full sm:w-auto">
							<Link to="/">Voltar para a home</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

export default NotFound;

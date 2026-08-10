import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

const NAV_LINKS = [
	{ href: "#beneficios", label: "Benefícios" },
	{ href: "#como-funciona", label: "Como funciona" },
	{ href: "#precos", label: "Preços" },
	{ href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-4 z-40 flex justify-center px-6">
			<div className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-background/70 py-2 pr-2 pl-4 shadow-2xl backdrop-blur-2xl">
				<a href="#top" className="flex shrink-0 items-center gap-2">
					<Logo variant="compact" className="size-6" />
					<span className="font-display text-foreground tracking-tight">
						Abyo
					</span>
				</a>

				<nav className="hidden items-center gap-6 lg:flex">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>

				<Button
					size="sm"
					className="hidden rounded-full lg:inline-flex"
					asChild
				>
					<a href="#contato">Começar agora</a>
				</Button>

				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full lg:hidden"
						>
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="dark w-full sm:max-w-xs">
						<SheetHeader>
							<SheetTitle className="flex items-center gap-2 font-display">
								<Logo variant="compact" className="size-6" />
								Abyo
							</SheetTitle>
						</SheetHeader>
						<nav className="flex flex-col gap-1 px-4">
							{NAV_LINKS.map((link) => (
								<a
									key={link.href}
									href={link.href}
									onClick={() => setOpen(false)}
									className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
								>
									{link.label}
								</a>
							))}
						</nav>
						<div className="mt-auto p-4">
							<Button className="w-full" asChild onClick={() => setOpen(false)}>
								<a href="#contato">Começar agora</a>
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}

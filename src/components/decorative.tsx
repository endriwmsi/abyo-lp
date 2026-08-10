import { cn } from "#/lib/utils";

export function Glow({ className }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={cn("pointer-events-none absolute rounded-full", className)}
			style={{
				background:
					"radial-gradient(circle, color-mix(in oklch, var(--primary) 55%, transparent) 0%, transparent 70%)",
				filter: "blur(90px)",
			}}
		/>
	);
}

export function GrainOverlay() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
			style={{
				backgroundImage:
					"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
			}}
		/>
	);
}

export function GridPattern({ className }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]",
				className,
			)}
			style={{
				backgroundImage:
					"linear-gradient(color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)",
				backgroundSize: "48px 48px",
			}}
		/>
	);
}

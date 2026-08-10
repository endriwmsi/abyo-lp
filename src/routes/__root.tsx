import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { FAQ_ITEMS } from "#/components/faq-section";
import appCss from "../styles.css?url";

const SITE_URL = "https://abyo.com.br";
const SITE_TITLE = "Abyo — Plataforma de revenda de recuperação de crédito";
const SITE_DESCRIPTION =
	"Plataforma white-label para revenda de recuperação de crédito: rede de indicação multinível, PIX e assinatura digital de documentos, com a sua marca.";
const OG_IMAGE = `${SITE_URL}/assets/images/lp-hero-dashboard.jpg`;

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Abyo",
	url: SITE_URL,
	logo: `${SITE_URL}/logo-512.png`,
	description: SITE_DESCRIPTION,
};

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQ_ITEMS.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: item.answer,
		},
	})),
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: SITE_TITLE,
			},
			{
				name: "description",
				content: SITE_DESCRIPTION,
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				name: "theme-color",
				content: "#39d59f",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: `${SITE_URL}/`,
			},
			{
				property: "og:site_name",
				content: "Abyo",
			},
			{
				property: "og:locale",
				content: "pt_BR",
			},
			{
				property: "og:title",
				content: SITE_TITLE,
			},
			{
				property: "og:description",
				content: SITE_DESCRIPTION,
			},
			{
				property: "og:image",
				content: OG_IMAGE,
			},
			{
				property: "og:image:width",
				content: "1440",
			},
			{
				property: "og:image:height",
				content: "923",
			},
			{
				property: "og:image:alt",
				content:
					"Painel Abyo — comissões, rede de indicação e solicitações pagas",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: SITE_TITLE,
			},
			{
				name: "twitter:description",
				content: SITE_DESCRIPTION,
			},
			{
				name: "twitter:image",
				content: OG_IMAGE,
			},
			{
				"script:ld+json": organizationJsonLd,
			},
			{
				"script:ld+json": faqJsonLd,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: `${SITE_URL}/`,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "any",
			},
			{
				rel: "apple-touch-icon",
				href: "/logo-192.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Toaster richColors position="top-center" />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

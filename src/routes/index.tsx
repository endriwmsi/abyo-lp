import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ContactSection } from "#/components/contact-section";
import { GrainOverlay } from "#/components/decorative";
import { FaqSection } from "#/components/faq-section";
import { FeaturesSection } from "#/components/features-section";
import { HeroSection } from "#/components/hero-section";
import { HowItWorksSection } from "#/components/how-it-works-section";
import { KeywordMarquee } from "#/components/keyword-marquee";
import { PlansSection } from "#/components/plans-section";
import { RoadmapSection } from "#/components/roadmap-section";
import { SiteFooter } from "#/components/site-footer";
import { SiteHeader } from "#/components/site-header";
import { TestimonialsSection } from "#/components/testimonials-section";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const [prefillMessage, setPrefillMessage] = useState<string>();

	function handleBookCall(message: string) {
		setPrefillMessage(message);
		document
			.querySelector("#contato")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	return (
		<div className="landing-root dark min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
			<GrainOverlay />
			<SiteHeader />
			<main className="relative">
				<HeroSection />
				<KeywordMarquee />
				<FeaturesSection />
				<HowItWorksSection />
				<TestimonialsSection />
				<PlansSection onBookCall={handleBookCall} />
				<RoadmapSection />
				<FaqSection />
				<ContactSection prefillMessage={prefillMessage} />
			</main>
			<SiteFooter />
		</div>
	);
}

import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/utils";
import { Reveal } from "./reveal";

export const FAQ_ITEMS = [
	{
		question: "Por que não tem uma tabela de preços na página?",
		answer:
			"Porque o valor certo depende de quantos seats, quantos membros e qual volume sua operação precisa. Numa call de 20 minutos entendemos isso e já saímos com uma proposta fechada — sem letra miúda e sem chute.",
	},
	{
		question: "Como funciona o pagamento dos meus clientes?",
		answer:
			"Todo pagamento é feito via PIX, integrado com Woovi e Asaas. A cobrança pode ser avulsa ou em lote, e a confirmação é automática assim que o pagamento é compensado — sem conciliação manual.",
	},
	{
		question: "Preciso pagar mesmo sem vender nada?",
		answer:
			"A assinatura é renovada manualmente por ciclo, sem cobrança recorrente automática. Você só paga de novo no vencimento do ciclo escolhido — sem surpresa no cartão ou no PIX.",
	},
	{
		question: "Como funciona a comissão da minha rede de indicação?",
		answer:
			"Members indicam novos parceiros, formando uma rede multinível. A comissão de cada venda sobe automaticamente pela rede, até 10 níveis de profundidade, sem cálculo manual.",
	},
	{
		question: "Dá pra controlar o que cada pessoa da equipe acessa?",
		answer:
			"Sim. O RBAC é granular: você cria roles com permissão fina por recurso e por ação (ler, exportar, excluir, notificar...), editáveis em tempo real, sem depender de suporte técnico.",
	},
	{
		question: "A plataforma fica com a minha marca?",
		answer:
			"Sim — é uma instalação exclusiva e isolada para a sua empresa (single-tenant), com o seu domínio e a sua identidade visual em todo o painel e nas telas públicas de assinatura.",
	},
	{
		question: "Consigo migrar de planilhas e grupos de WhatsApp?",
		answer:
			"Sim. O catálogo de serviços é configurável por formulário — sem programação — e a extração de dados em lote (planilha + documentos) já vem pronta pra quem está migrando de um processo manual.",
	},
];

export function FaqSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section id="faq" className="relative py-16 sm:py-20">
			<div className="mx-auto max-w-3xl px-6">
				<Reveal className="text-center">
					<span className="text-xs font-medium uppercase tracking-widest text-primary">
						FAQ
					</span>
					<h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
						Perguntas <span className="text-primary">frequentes</span>
					</h2>
				</Reveal>

				<Reveal delay={0.1} className="mt-12 space-y-3">
					{FAQ_ITEMS.map((item, index) => {
						const open = openIndex === index;
						return (
							<div
								key={item.question}
								className={cn(
									"overflow-hidden rounded-2xl border transition-colors",
									open
										? "border-primary/30 bg-white/4"
										: "border-white/10 bg-white/2",
								)}
							>
								<button
									type="button"
									onClick={() => setOpenIndex(open ? null : index)}
									className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
								>
									<span className="font-medium text-foreground text-sm sm:text-base">
										{item.question}
									</span>
									<motion.span
										animate={{ rotate: open ? 45 : 0 }}
										transition={{ duration: 0.2 }}
										className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-primary"
									>
										<PlusIcon className="size-3.5" />
									</motion.span>
								</button>
								<AnimatePresence initial={false}>
									{open && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.25, ease: "easeInOut" }}
											className="overflow-hidden"
										>
											<p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
												{item.answer}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</Reveal>
			</div>
		</section>
	);
}

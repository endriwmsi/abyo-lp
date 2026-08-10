export interface LandingPlan {
	id: string;
	name: string;
	tagline: string;
	seats: string;
	members: string;
	highlight?: boolean;
}

export const LANDING_PLANS: LandingPlan[] = [
	{
		id: "start",
		name: "Start",
		tagline: "Pra sair do zero com estrutura própria e vender rápido",
		seats: "3 seats",
		members: "até 100 membros",
	},
	{
		id: "scale",
		name: "Scale",
		tagline: "Pra operações em crescimento com equipe maior",
		seats: "6 seats",
		members: "até 250 membros",
		highlight: true,
	},
	{
		id: "advanced",
		name: "Advanced",
		tagline: "Pra redes consolidadas com alto volume",
		seats: "10 seats",
		members: "até 500 membros",
	},
	{
		id: "custom",
		name: "Custom",
		tagline: "Pra operações acima de 1.000 membros",
		seats: "seats sob medida",
		members: "+1.000 membros",
	},
];

export interface PlanFeatureRow {
	label: string;
	/** Índice em `LANDING_PLANS` a partir do qual o recurso passa a estar incluído. */
	minPlanIndex: number;
}

// Cada recurso é incluído do `minPlanIndex` em diante (planos superiores
// herdam tudo dos inferiores) — fonte única de verdade pro grid de
// comparação, evita listas duplicadas e divergentes por plano.
export const PLAN_FEATURE_ROWS: PlanFeatureRow[] = [
	{ label: "Catálogo configurável", minPlanIndex: 0 },
	{ label: "Rede multinível", minPlanIndex: 0 },
	{ label: "PIX (Woovi & Asaas)", minPlanIndex: 0 },
	{ label: "Assinatura digital", minPlanIndex: 0 },
	{ label: "RBAC granular", minPlanIndex: 0 },
	{ label: "Campanhas em lote", minPlanIndex: 1 },
	{ label: "Controle financeiro", minPlanIndex: 1 },
	{ label: "Onboarding assistido", minPlanIndex: 2 },
	{ label: "Condições personalizadas", minPlanIndex: 3 },
];

export function isFeatureIncluded(
	planIndex: number,
	row: PlanFeatureRow,
): boolean {
	return planIndex >= row.minPlanIndex;
}

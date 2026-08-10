import { QueryClient } from "@tanstack/react-query";

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// Default 0 do TanStack Query refaz fetch em todo remount — em
				// troca de tela dentro do dashboard isso multiplica requests pro
				// Worker/Neon sem necessidade. Hooks que precisam de dado sempre
				// fresco (polling de status de PIX, notificações) já sobrescrevem
				// isso com `refetchInterval` próprio.
				staleTime: 30 * 1000,
			},
		},
	});

	return {
		queryClient,
	};
}
export default function TanstackQueryProvider() {}

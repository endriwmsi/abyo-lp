/**
 * Lê uma variável de ambiente de servidor obrigatória (secret do Wrangler em
 * produção, `.env.local` em dev) e falha alto se ela não estiver definida —
 * em vez de deixar `undefined` vazar para dentro de um client (Neon, Resend,
 * Woovi...) e falhar com um erro genérico mais tarde.
 */
export function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required env var: ${name}`);
	}
	return value;
}

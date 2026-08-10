import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSendContactMessage } from "#/hooks/use-contato";
import {
	type ContactMessageInput,
	contactMessageSchema,
} from "#/schemas/contact";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { PhoneInput } from "./ui/phone-input";
import { Textarea } from "./ui/textarea";

export function ContactForm({ prefillMessage }: { prefillMessage?: string }) {
	const sendContactMessage = useSendContactMessage();

	const form = useForm<ContactMessageInput>({
		resolver: zodResolver(contactMessageSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			company: "",
			message: "",
		},
	});

	useEffect(() => {
		if (prefillMessage) {
			form.setValue("message", prefillMessage);
		}
	}, [prefillMessage, form]);

	async function onSubmit(values: ContactMessageInput) {
		try {
			await sendContactMessage.mutateAsync(values);
			toast.success("Mensagem enviada! Nosso time volta em breve.");
			form.reset();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Falha ao enviar mensagem.",
			);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="Seu nome" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="voce@empresa.com.br"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefone</FormLabel>
							<FormControl>
								<PhoneInput value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Empresa</FormLabel>
							<FormControl>
								<Input placeholder="Nome da sua empresa" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mensagem</FormLabel>
							<FormControl>
								<Textarea
									rows={4}
									placeholder="Conte um pouco sobre sua operação..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? "Enviando..." : "Enviar mensagem"}
				</Button>
			</form>
		</Form>
	);
}

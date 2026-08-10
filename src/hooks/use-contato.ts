import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "#/server/send-contact-message";

export function useSendContactMessage() {
	return useMutation({
		mutationFn: (data: Parameters<typeof sendContactMessage>[0]["data"]) =>
			sendContactMessage({ data }),
	});
}

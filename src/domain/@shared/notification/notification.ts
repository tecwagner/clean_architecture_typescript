export type NotificationErrorProps = {
	message: string;
	context: string;
};

export default class Notification {
	private _errors: NotificationErrorProps[] = []; // Iniciando com array vazio

	// adiciona os erros ao array de NotificationErrorProps
	addError(error: NotificationErrorProps) {
		this._errors.push(error);
	}

	hasErrors(): boolean {
		return this._errors.length > 0;
	}

	errors(): NotificationErrorProps[] {
		return this._errors;
	}

	// Retona os erros filtrando e mapeando comforme o conteudo e separa por virgula
	messages(context?: string): string {
		// return this._errors
		// 	.filter((error) => error.context === context)
		// 	.map((error) => `${error.context}: ${error.message},`)
		// 	.join(',');

		let message = '';

		this._errors.forEach((error) => {
			if (context === undefined || error.context === context)
				message += `${error.context}: ${error.message},`;
		});
		return message;
	}
}

import {NotificationErrorProps} from './notification';

export default class NotificationError extends Error {
	constructor(public errors: NotificationErrorProps[]) {
		// O super Chamando o constructor da classe de Notification
		super(
			errors.map((error) => `${error.context}: ${error.message}`).join(',')
		);
	}
}

import Notification from '../notification/notification';

export default abstract class Entity {
	protected _id!: string; // inicia em branco
	public notification: Notification;

	constructor() {
		this.notification = new Notification();
	}
}
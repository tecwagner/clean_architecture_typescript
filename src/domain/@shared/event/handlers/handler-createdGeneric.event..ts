import EventInterface from '../interfaces/event.interface';

export default class HandlerCreatedGenericEvent implements EventInterface {
	dateTimeOccurred: Date;
	eventData: any;

	constructor(eventData: any) {
		this.dateTimeOccurred = new Date();
		this.eventData = eventData;
	}
}

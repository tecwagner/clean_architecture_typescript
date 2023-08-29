import EventInterface from '../interfaces/event.interface';

type CreatedCustomer = {
	id: string;
	name: string;
};

export default class HandlerCreatedEvent implements EventInterface {
	dateTimeOccurred: Date;
	eventData: CreatedCustomer;

	constructor(eventData: CreatedCustomer) {
		this.dateTimeOccurred = new Date();
		this.eventData = eventData;
	}
}

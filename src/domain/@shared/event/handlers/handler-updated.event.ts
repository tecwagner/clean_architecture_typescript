import Address from '../../../customer/value-object/address';
import EventInterface from '../interfaces/event.interface';

type CustomerAddressChanged = {
	id: string;
	name: string;
	address: Address;
};

export default class HandlerUpdatedEvent implements EventInterface {
	dateTimeOccurred: Date;
	eventData: CustomerAddressChanged;

	constructor(eventData: CustomerAddressChanged) {
		this.dateTimeOccurred = new Date();
		this.eventData = eventData;
	}
}

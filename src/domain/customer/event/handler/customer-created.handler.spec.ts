import EventDispatcher from '../../../@shared/event/dispatcher/event-dispatcher';
import HandlerCreatedEvent from '../../../@shared/event/handlers/handler-created.event';
import Customer from '../../entity/customer';
import SendEmailWhenCustomerIsCreatedHandler from './send-email-when-is-customer-created.handler';
import SendEmailWhenCustomerIsCreatedHandler2 from './send-email-when-is-customer-created.handler2';

describe('Domain Events Test Customer Handler Created', () => {
	it('should notify One event handlers', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandlerOne = new SendEmailWhenCustomerIsCreatedHandler();

		// O metodo jest.spyOn() monitora se o evento foi executado
		const spyEventHandler = jest.spyOn(eventHandlerOne, 'handler');

		const customerOne = new Customer('C1', 'John');

		eventDispatcher.register('HandlerCreatedEvent', eventHandlerOne);

		expect(
			eventDispatcher.getEventHandlers['HandlerCreatedEvent'][0]
		).toMatchObject(eventHandlerOne);

		// Implementando objeto de criação de produto
		const customerCreatedEvent = new HandlerCreatedEvent({
			id: customerOne.id,
			name: customerOne.name,
		});

		// Quando o notify for executado o SendEmailwhenproductIsCreated.handler() deve ser chamado e executado
		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
	it('should notify Two event handlers', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandlerTwo = new SendEmailWhenCustomerIsCreatedHandler2();

		// O metodo jest.spyOn() monitora se o evento foi executado
		const spyEventHandler = jest.spyOn(eventHandlerTwo, 'handler');

		const customerTwo = new Customer('C2', 'Mari');

		eventDispatcher.register('HandlerCreatedEvent', eventHandlerTwo);

		expect(
			eventDispatcher.getEventHandlers['HandlerCreatedEvent'][0]
		).toMatchObject(eventHandlerTwo);

		// Implementando objeto de criação de produto
		const customerCreatedEvent = new HandlerCreatedEvent({
			id: customerTwo.id,
			name: customerTwo.name,
		});

		// Quando o notify for executado o SendEmailwhenproductIsCreated.handler() deve ser chamado e executado
		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
});

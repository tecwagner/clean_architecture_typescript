import EventDispatcher from '../../../@shared/event/dispatcher/event-dispatcher';
import HandlerUpdatedEvent from '../../../@shared/event/handlers/handler-updated.event';
import Customer from '../../entity/customer';
import Address from '../../value-object/address';
import SendEmailWhenCustomerIsUpdatedHandler from './send-email-when-is-customer-updated.handler';


describe('Domain Events Test Customer Updated Handler', () => {
	it('should notify event handlers update address', async () => {
		// const customerRepository = new CustomerRepository();
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenCustomerIsUpdatedHandler();

		// O metodo jest.spyOn() monitora se o evento foi executado
		const spyEventHandler = jest.spyOn(eventHandler, 'handler');

		const customer = new Customer('C1', 'John');
		const address = new Address('Street', 123, '123456789', 'Franca');

		customer.Address = address;
		// customerRepository.create(customer);

		const address2 = new Address('Street 1', 1234, '123456-789', 'Ribeirão');

		customer.changeAddress(address2);

		eventDispatcher.register('HandlerUpdatedEvent', eventHandler);

		expect(
			eventDispatcher.getEventHandlers['HandlerUpdatedEvent'][0]
		).toMatchObject(eventHandler);

		// Implementando objeto de criação de produto
		const customerCreatedEvent = new HandlerUpdatedEvent({
			id: customer.id,
			name: customer.name,
			address: customer.address,
		});

		// Quando o notify for executado o SendEmailwhenproductIsCreated.handler() deve ser chamado e executado
		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
});

import SendEmailWhenProductIsCreatedHandler from '../../../product/event/handler/send-email-when-product-is-created.handler';
import EventDispatcher from './event-dispatcher';

describe('Domain events test', () => {
	it('should register an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register('ProductCreatedEvent', eventHandler);

		// name registrado
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent']
		).toBeDefined();

		// Quantidade de eventos
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
			1
		);

		// Verificanddo se o evento registrado é igual ou existente
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
		).toMatchObject(eventHandler);
	});

	it('should unregister an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register('ProductCreatedEvent', eventHandler);

		// Verificanddo se o evento registrado é igual ou existente
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
		).toMatchObject(eventHandler);

		// Implementando metodo para desregistrar
		eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

		// name registrado
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent']
		).toBeDefined();

		// Quantidade de eventos
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
			0
		);
	});

	it('should unregister all event handlers', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register('ProductCreatedEvent', eventHandler);

		// Verificanddo se o evento registrado é igual ou existente
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
		).toMatchObject(eventHandler);

		// Implementando metodo para desregistrar todos
		eventDispatcher.unregisterAll();

		// registro de objeto em branco
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent']
		).toBeUndefined();
	});
});

import HandlerCreatedEvent from '../../../@shared/event/handlers/handler-created.event';
import EventHandlerInterface from '../../../@shared/event/interfaces/event-handler.interface';

export default class SendEmailWhenCustomerIsCreatedHandler
	implements EventHandlerInterface<HandlerCreatedEvent>
{
	handler(event: HandlerCreatedEvent): void {
		console.log(
			`Esse é o primeiro console.log do evento: CustomerCreated, ID: ${event.eventData.id} Cliente: ${event.eventData.name} `
		);
	}
}

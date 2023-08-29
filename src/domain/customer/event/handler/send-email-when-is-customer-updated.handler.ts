import HandlerUpdatedEvent from '../../../@shared/event/handlers/handler-updated.event';
import EventHandlerInterface from '../../../@shared/event/interfaces/event-handler.interface';

export default class SendEmailWhenCustomerIsUpdatedHandler
	implements EventHandlerInterface<HandlerUpdatedEvent>
{
	handler(event: HandlerUpdatedEvent): void {
		console.log(
			`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name}, foi alterado para:  ${event.eventData.address}`
		);
	}
}

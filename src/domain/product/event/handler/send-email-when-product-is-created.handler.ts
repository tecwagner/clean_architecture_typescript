import HandlerCreatedGenericEvent from '../../../@shared/event/handlers/handler-createdGeneric.event.';
import EventHandlerInterface from '../../../@shared/event/interfaces/event-handler.interface';

export default class SendEmailWhenProductIsCreatedHandler
	implements EventHandlerInterface<HandlerCreatedGenericEvent>
{
	handler(event: HandlerCreatedGenericEvent): void {
		throw new Error('Method not implemented.');
	}
}

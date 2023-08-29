import HandlerCreatedEvent from "../../../@shared/event/handlers/handler-created.event";
import EventHandlerInterface from "../../../@shared/event/interfaces/event-handler.interface";


export default class SendEmailWhenCustomerIsCreatedHandler2
	implements EventHandlerInterface<HandlerCreatedEvent>
{
	handler(event: HandlerCreatedEvent): void {
		console.log(
			`Esse é o segundo console.log do evento: CustomerCreated, ID: ${event.eventData.id} Cliente: ${event.eventData.name} `
		);
	}
}

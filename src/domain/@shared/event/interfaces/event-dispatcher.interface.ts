import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default interface EventDispatcherInterface {
	// Notificando o tipo do evento
	notify(event: EventInterface): void;

	// Registrando um evento
	register(eventName: string, eventHandler: EventHandlerInterface): void;

	// Desregistrando um evento
	unregister(eventName: string, eventHandler: EventHandlerInterface): void;

	// Desregistrando todos os eventos
	unregisterAll(): void;
}

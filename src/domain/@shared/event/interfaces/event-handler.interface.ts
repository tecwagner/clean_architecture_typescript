import EventInterface from './event.interface';

//Evento que recebe um evento, baseado nesse evento é executado
export default interface EventHandlerInterface<
	T extends EventInterface = EventInterface
> {
	// Executar evento
	handler(event: T): void;
}

import EventDispatcherInterface from '../interfaces/event-dispatcher.interface';
import EventHandlerInterface from '../interfaces/event-handler.interface';
import EventInterface from '../interfaces/event.interface';

export default class EventDispatcher implements EventDispatcherInterface {
	// Eventos de execucao
	private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {};

	// disponibilizando o metodo para fora da classe
	get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
		return this.eventHandlers;
	}

	notify(event: EventInterface): void {
		// Acessando o nome do evento pelo nome da classe
		const eventName = event.constructor.name;
		if (this.eventHandlers[eventName]) {
			this.eventHandlers[eventName].forEach((eventHandler) => {
				eventHandler.handler(event);
			});
		}
	}

	register(eventName: string, eventHandler: EventHandlerInterface): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(eventHandler);
	}

	unregister(eventName: string, eventHandler: EventHandlerInterface): void {
		if (this.eventHandlers[eventName]) {
			const index = this.eventHandlers[eventName].indexOf(eventHandler);
			if (index > -1) {
				this.eventHandlers[eventName].splice(index, 1);
			}
		}
	}

	unregisterAll(): void {
		this.eventHandlers = {};
	}
}

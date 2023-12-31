import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import CustomerValidatorFactory from '../factory/customer.validator.factory';
import Address from '../value-object/address';
import CustomerInterface from './customer.interface';

export default class Customer extends Entity implements CustomerInterface {
	private _name: string = '';
	private _address!: Address; //sinal de esclamação informa que a propriedade inicia em branco.
	private _active: boolean = false; //inicializando
	private _rewardPoints: number = 0; // Inicializando os ponto do cliente

	constructor(id: string, name: string) {
		super();
		this._id = id;
		this._name = name;
		this.validate();

		if (this.notification.hasErrors()) {
			throw new NotificationError(this.notification.errors());
		}
	}

	//Regra de negocio da entidade

	get id(): string {
		return this._id;
	}

	// Devido o name ser privado eu preciso implementar o get para que retorne o name
	get name(): string {
		return this._name;
	}

	// Informa os pontos
	get rewardPoints(): number {
		return this._rewardPoints;
	}

	get address(): Address {
		return this._address;
	}

	validate() {
		// A CustomerValidatorFactory: é responsavél por validar a entidade de classe
		CustomerValidatorFactory.create().validate(this);
	}

	// Adiciona pontos ao usuario
	addRewardPoints(points: number) {
		this._rewardPoints += points;
	}

	changeAddress(address: Address) {
		this._address = address;
	}

	// Criando metodos de validação para que o estado atual da entidade esteja sempre correto.
	// Ao contrario de utilizar os get e set. Devemos criar os metodos
	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	// Valida se o cliente é ativo ou não
	isActive(): boolean {
		return this._active;
	}

	activate() {
		if (this._address === undefined) {
			throw new Error('Address is mandatory to activate a customer');
		}
		this._active = true;
	}

	deactive() {
		this._active = false;
	}

	//Ele deve setar um endereço, para que seja atualizado
	set Address(address: Address) {
		this._address = address;
	}
}

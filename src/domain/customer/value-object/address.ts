import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';

export default class Address extends Entity {
	_street: string = '';
	_number: number = 0;
	_zip: string = '';
	_city: string = '';

	constructor(street: string, number: number, zip: string, city: string) {
		super();
		this._street = street;
		this._number = number;
		this._zip = zip;
		this._city = city;

		this.validate();

		if (this.notification.hasErrors()) {
			throw new NotificationError(this.notification.errors());
		}
	}

	get street(): string {
		return this._street;
	}

	get number(): number {
		return this._number;
	}

	get zip(): string {
		return this._zip;
	}

	get city(): string {
		return this._city;
	}

	validate() {
		if (this._street.length === 0) {
			this.notification.addError({
				context: 'address',
				message: 'Street is required',
			});
			// throw new Error('Street is required');
		}
		if (this._number === 0) {
			this.notification.addError({
				context: 'address',
				message: 'Number is required',
			});
			// throw new Error('Number is required');
		}
		if (this._zip.length === 0) {
			this.notification.addError({
				context: 'address',
				message: 'Zip is required',
			});
			// throw new Error('Zip is required');
		}
		if (this._city.length === 0) {
			this.notification.addError({
				context: 'address',
				message: 'City is required',
			});
			// throw new Error('City is required');
		}
	}

	toString() {
		return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
	}
}

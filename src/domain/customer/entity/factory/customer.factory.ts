import {v4 as uuid} from 'uuid';
import Customer from '../customer';
import CustomerInterface from '../customer.interface';
import Address from '../../value-object/address';

export default class CustomerFactory {
	public static create(name: string): CustomerInterface {
		return new Customer(uuid(), name);
	}

	public static createWithAddress(
		name: string,
		address: Address
	): CustomerInterface {
		const customer = new Customer(uuid(), name);
		customer.changeAddress(address);
		return customer;
	}
}

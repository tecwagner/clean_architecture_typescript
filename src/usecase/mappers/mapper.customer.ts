import Customer from '../../domain/customer/entity/customer';
import {OutputListCustomerDto} from '../customer/list/list.customer.dto';

export class OutputMapper {
	static toOutputMapper(customer: Customer[]): OutputListCustomerDto {
		return {
			customers: customer.map((customer) => ({
				id: customer.id,
				name: customer.name,
				address: {
					street: customer.address.street,
					number: customer.address.number,
					zip: customer.address.zip,
					city: customer.address.city,
				},
			})),
		};
	}
}

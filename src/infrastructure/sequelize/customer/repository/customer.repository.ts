import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../model/customer.model";


export default class CustomerRepository implements CustomerRepositoryInterface {
	async create(customer: Customer): Promise<void> {
		try {
			await CustomerModel.create({
				id: customer.id,
				name: customer.name,
				active: customer.isActive(),
				rewardPoints: customer.rewardPoints,
				street: customer.address.street,
				number: customer.address.number,
				zipcode: customer.address.zip,
				city: customer.address.city,
			});
		} catch (error) {
			throw new Error('An error occurred while creating a client' + error);
		}
	}
	async update(customer: Customer): Promise<void> {
		try {
			await CustomerModel.update(
				{
					name: customer.name,
					active: customer.isActive(),
					rewardPoints: customer.rewardPoints,
					street: customer.address.street,
					number: customer.address.number,
					zipcode: customer.address.zip,
					city: customer.address.city,
				},
				{
					where: {
						id: customer.id,
					},
				}
			);
		} catch (error) {
			throw new Error('Error when changing customer data' + error);
		}
	}
	async find(id: string): Promise<Customer> {
		let customerModel;
		try {
			customerModel = await CustomerModel.findOne({
				where: {
					id,
				},
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error('Customer not found' + error);
		}

		const customer = new Customer(id, customerModel.name);
		const address = new Address(
			customerModel.street,
			customerModel.number,
			customerModel.zipcode,
			customerModel.city
		);

		customer.changeAddress(address);
		return customer;
	}
	async findAll(): Promise<Customer[]> {
		try {
			const customerModels = await CustomerModel.findAll();

			const customers = customerModels.map((customerModels) => {
				let customer = new Customer(customerModels.id, customerModels.name);
				customer.addRewardPoints(customerModels.rewardPoints);
				const address = new Address(
					customerModels.street,
					customerModels.number,
					customerModels.zipcode,
					customerModels.city
				);
				customer.changeAddress(address);
				if (customerModels.active) {
					customer.activate();
				}
				return customer;
			});

			return customers;
		} catch (error) {
			throw new Error('Customers not found' + error);
		}
	}
}

import {v4 as uuid} from 'uuid';
import CreateCustomerUsecase from './create.customer.usecase';
import {Sequelize} from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/sequelize/customer/model/customer.model';
import CustomerRepository from '../../../infrastructure/sequelize/customer/repository/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';

describe('Integration Test create customer use case', () => {
	let sequelize: Sequelize;

	// Config to sequelize instance
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: {force: true},
		});

		//adicionando o model ao test
		await sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});
	afterEach(async () => {
		await sequelize.close();
	});
	it('should create a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const usecase = new CreateCustomerUsecase(customerRepository);

		const input = {
			id: customer.id,
			name: customer.name,
			address: {
				street: address.street,
				number: address.number,
				zip: address.zip,
				city: address.city,
			},
		};
		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: output.id,
			name: input.name,
			address: {
				street: input.address.street,
				number: input.address.number,
				zip: input.address.zip,
				city: input.address.city,
			},
		});
	});
});

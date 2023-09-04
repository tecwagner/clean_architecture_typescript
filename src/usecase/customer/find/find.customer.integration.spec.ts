import CustomerModel from '../../../infrastructure/sequelize/customer/model/customer.model';
import Customer from '../../../domain/customer/entity/customer';
import {Sequelize} from 'sequelize-typescript';
import Address from '../../../domain/customer/value-object/address';
import CustomerRepository from '../../../infrastructure/sequelize/customer/repository/customer.repository';
import FindCustomerUsecase from './find.customer.usecase';

describe('Test find customer use case', () => {
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

	it('should find a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');

		customer.changeAddress(address);
		await customerRepository.create(customer);

		const usecase = new FindCustomerUsecase(customerRepository);

		const input = {
			id: customer.id,
		};

		const output = {
			id: customer.id,
			name: customer.name,
			address: {
				street: address.street,
				number: address.number,
				zip: address.zip,
				city: address.city,
			},
		};
		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});

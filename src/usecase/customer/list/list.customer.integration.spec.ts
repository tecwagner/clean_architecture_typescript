import {Sequelize} from 'sequelize-typescript';
import CustomerFactory from '../../../domain/customer/entity/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomersUseCase from './list.customer.usecase';
import CustomerModel from '../../../infrastructure/sequelize/customer/model/customer.model';
import CustomerRepository from '../../../infrastructure/sequelize/customer/repository/customer.repository';

describe('Integration test for list customer use case', () => {
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
	it('should list a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer1 = CustomerFactory.createWithAddress(
			'Wagner Oliveira',
			new Address('Onofre', 1234, '148865445', 'Franca-SP')
		);
		const customer2 = CustomerFactory.createWithAddress(
			'Amanda Daniele',
			new Address('Onofre', 1234, '148865445', 'Franca-SP')
		);
		await customerRepository.create(customer1);
		await customerRepository.create(customer2);
		const useCase = new ListCustomersUseCase(customerRepository);

		const output = await useCase.execute({});

		expect(output.customers.length).toBe(2);
		// data persson 1
		expect(output.customers[0].id).toBe(customer1.id);
		expect(output.customers[0].name).toBe(customer1.name);
		expect(output.customers[0].address.street).toBe(customer1.address.street);
		expect(output.customers[0].address.number).toBe(customer1.address.number);
		expect(output.customers[0].address.zip).toBe(customer1.address.zip);
		expect(output.customers[0].address.city).toBe(customer1.address.city);
		// data persson 2
		expect(output.customers[1].id).toBe(customer2.id);
		expect(output.customers[1].name).toBe(customer2.name);
		expect(output.customers[1].address.street).toBe(customer2.address.street);
		expect(output.customers[1].address.number).toBe(customer2.address.number);
		expect(output.customers[1].address.zip).toBe(customer2.address.zip);
		expect(output.customers[1].address.city).toBe(customer2.address.city);
	});
});

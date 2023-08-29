import {Sequelize} from 'sequelize-typescript';
import CustomerRepository from './customer.repository';
import CustomerModel from '../model/customer.model';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';

describe('Customer repository test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: {force: true},
		});

		//adicionando o model ao test
		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});
	afterEach(async () => {
		await sequelize.close();
	});

	it('should create a Customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');

		customer.Address = address;

		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({where: {id: '1'}});

		expect(customerModel?.toJSON()).toMatchObject({
			id: '1',
			name: customer.name,
			active: customer.isActive(),
			rewardPoints: customer.rewardPoints,
			street: address.street,
			number: address.number,
			zipcode: address.zip,
			city: address.city,
		});
	});

	it('should update a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');

		customer.Address = address;
		customerRepository.create(customer);

		customer.changeName('John');
		await customerRepository.update(customer);

		const customerModel = await CustomerModel.findOne({where: {id: '1'}});
		expect(customerModel?.toJSON()).toMatchObject({
			id: '1',
			name: customer.name,
			active: customer.isActive(),
			rewardPoints: customer.rewardPoints,
			street: address.street,
			number: address.number,
			zipcode: address.zip,
			city: address.city,
		});
	});

	it('should find a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
		customer.Address = address;

		await customerRepository.create(customer);
		const customerResult = await customerRepository.find(customer.id);

		expect(customer).toEqual(customerResult);
	});

	it('should throw an error when customer is not found', async () => {
		const customerRepository = new CustomerRepository();

		expect(customerRepository.find('321')).rejects.toThrow(
			'Customer not found'
		);
	});

	it('should find all customers', async () => {
		const customerRepository = new CustomerRepository();
		const customer1 = new Customer('1', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
		customer1.Address = address;

		customer1.addRewardPoints(2);
		customer1.activate();

		const customer2 = new Customer('2', 'John Doe');
		const address2 = new Address('Amadeu', 321, '14407351', 'Restinga');

		customer2.Address = address2;
		customer2.addRewardPoints(3);
		customer2.activate();

		await customerRepository.create(customer1);
		await customerRepository.create(customer2);

		const customers = await customerRepository.findAll();

		expect(customers).toHaveLength(2);
		expect(customers).toContainEqual(customer1);
		expect(customers).toContainEqual(customer2);
	});
});

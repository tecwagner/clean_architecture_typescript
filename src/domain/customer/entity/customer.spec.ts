import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit test', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			let customer = new Customer('', 'John');
		}).toThrowError('customer: Id is required');
	});
	it('should throw error when name is empty', () => {
		expect(() => {
			let customer = new Customer('123', '');
		}).toThrowError('customer: Name is required');
	});
	it('should throw error when name is and id are empty', () => {
		expect(() => {
			let customer = new Customer('', '');
		}).toThrowError('customer: Id is required,customer: Name is required');
	});
	it('should change name', () => {
		// Arrange
		const customer = new Customer('123', 'John');

		// Act
		customer.changeName('Jane');

		// Assert
		expect(customer.name).toBe('Jane');
	});
	it('should activate customer', () => {
		const customer = new Customer('1', 'John 1');

		const address = new Address('Rua: Teste 1', 1234, '14408050', 'Franca');

		customer.Address = address;

		customer.activate();

		expect(customer.isActive()).toBe(true);
	});

	it('should deactivate customer', () => {
		const customer = new Customer('2', 'John 2');

		customer.deactive();

		expect(customer.isActive()).toBe(false);
	});

	it('should throw error when address is undefined when you activate a customer', () => {
		expect(() => {
			const customer = new Customer('3', 'John 3');

			customer.activate();
		}).toThrowError('Address is mandatory to activate a customer');
	});

	it('should add reward points', () => {
		const customer = new Customer('c1', 'CLI 1');
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});
});

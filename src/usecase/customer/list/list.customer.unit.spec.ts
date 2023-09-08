import CustomerFactory from '../../../domain/customer/entity/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
	'Wagner Oliveira',
	new Address('Onofre', 1234, '148865445', 'Franca-SP')
);
const customer2 = CustomerFactory.createWithAddress(
	'Amanda Daniele',
	new Address('Onofre', 1234, '148865445', 'Franca-SP')
);

// Criando um repository feak com os mestodos a ser implementados
const MockRespository = () => {
	return {
		find: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])), // busca o customer exitente no mock,
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit test for list customer use case', () => {
	it('should list a customer', async () => {
		const mockRespository = MockRespository();
		const useCase = new ListCustomerUseCase(mockRespository);

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

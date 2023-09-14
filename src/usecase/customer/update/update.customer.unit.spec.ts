import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
	'Wagner',
	new Address('Onofre', 1234, '148865445', 'Franca-SP')
);

// Mock dos dados de entidade
const input = {
	id: customer.id,
	name: 'Wagner Oliveira Update',
	address: {
		street: 'Onofre Raimundo Braga',
		number: 123,
		zip: '14405123',
		city: 'Franca-SP',
	},
};

// Criando um repository feak com os mestodos a ser implementados
const MockRespository = () => {
	return {
		find: jest.fn().mockReturnValue(Promise.resolve(customer)), // busca o customer exitente no mock
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		// .mockReturnValue(Promise.resolve(input)), // retorna o update e retornado o input
	};
};
describe('Unit test for customer update use case', () => {
	it('should update a customer', async () => {
		const customerRepository = MockRespository();
		const usecase = new UpdateCustomerUseCase(customerRepository);

		const output = await usecase.execute(input);

		expect(output).toEqual(input);
	});
});

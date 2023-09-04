import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerRepository from '../../../infrastructure/sequelize/customer/repository/customer.repository';
import FindCustomerUsecase from './find.customer.usecase';

// Mock dos dados de entidade
const customer = new Customer('123', 'Wagner Oliveira');
const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
customer.changeAddress(address);

// Criando um repository feak com os mestodos a ser implementados
const MockRespository = () => {
	return {
		find: jest.fn().mockReturnValue(Promise.resolve(customer)), // Quando o metodo find for chamado retorna esses dados
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit Test find customer use case', () => {
	it('should find a customer', async () => {
		const customerRepository = MockRespository();

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

	it('should not find a customer', async () => {
		const customerRepository = MockRespository();
		//testado o erro da camada de infrastructure que consulta customer
		customerRepository.find.mockImplementation(() => {
			throw new Error('Customer not found');
		});

		const usecase = new FindCustomerUsecase(customerRepository);

		const input = {
			id: customer.id,
		};

		expect(() => {
			return usecase.execute(input);
		}).rejects.toThrow('Customer not found');
	});
});

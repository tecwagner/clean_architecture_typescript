import {v4 as uuid} from 'uuid';
import CreateCustomerUsecase from './create.customer.usecase';
// Mock dos dados de entidade
const input = {
	name: 'Wagner Oliveira',
	address: {
		street: 'Onofre',
		number: 123,
		zip: '14405123',
		city: 'Franca-SP',
	},
};

// Criando um repository feak com os mestodos a ser implementados
const MockRespository = () => {
	return {
		find: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn().mockReturnValue(Promise.resolve(input)),
		update: jest.fn(),
	};
};

describe('Unit Test create customer use case', () => {
	it('should create a customer', async () => {
		const customerRepository = MockRespository();

		const usecase = new CreateCustomerUsecase(customerRepository);

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

	it('should thrown an error when name is missing', async () => {
		const customerRepository = MockRespository();

		const usecase = new CreateCustomerUsecase(customerRepository);

		input.name = '';

		await expect(usecase.execute(input)).rejects.toThrowError(
			'Name is required'
		);
	});

	it('should thrown an error when address is missing', async () => {
		const customerRepository = MockRespository();

		const usecase = new CreateCustomerUsecase(customerRepository);

		input.address.street = '';

		await expect(usecase.execute(input)).rejects.toThrowError(
			'Street is required'
		);
	});
});

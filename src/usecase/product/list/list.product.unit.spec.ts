import ProductFactory from '../../../domain/product/factory/product.factpry';
import ListProductsUseCase from './list.product.usecase';

const product1 = ProductFactory.create('Celular Moto G-20', 2000);
const product2 = ProductFactory.create('Notebook Aple', 7000);

// Criando um repository feak com os mestodos a ser implementados
const MockRespository = () => {
	return {
		find: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])), // busca o customer exitente no mock,
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit tests for list products use case', () => {
	it('should list products', async () => {
		const mockRespository = MockRespository();
		const usecase = new ListProductsUseCase(mockRespository);

		const output = await usecase.execute({});

		expect(output.products.length).toBe(2);

		expect(output.products[0].id).toBe(product1.id);
		expect(output.products[0].name).toBe(product1.name);
		expect(output.products[0].price).toBe(product1.price);

		expect(output.products[1].id).toBe(product2.id);
		expect(output.products[1].name).toBe(product2.name);
		expect(output.products[1].price).toBe(product2.price);
	});
});

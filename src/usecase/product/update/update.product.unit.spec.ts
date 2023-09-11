import ProductFactory from '../../../domain/product/factory/product.factpry';
import ProductService from '../../../domain/product/service/product.service';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.create('Camisa polo', 69.9);

const input = {
	id: product.id,
	name: 'Camisa polo manga longa - P',
	price: 77.99,
};

// Criando um repository feak com os mestodos a ser implementados
const MockRespository = () => {
	return {
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit test for product update use case', () => {
	it('should update a product', async () => {
		const productRepository = MockRespository();
		const usecase = new UpdateProductUseCase(productRepository);

		const output = await usecase.execute(input);

		expect(output).toEqual(input);
	});
});

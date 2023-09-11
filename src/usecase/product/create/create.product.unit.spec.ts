import CreateProductUseCase from './create.product.usecase';

const input = {
	name: 'Notebook ACER',
	price: 4500,
};

const MockRespository = () => {
	return {
		find: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn().mockReturnValue(Promise.resolve(input)),
		update: jest.fn(),
	};
};

describe('Unit Test create product use case', () => {
	it('should create a product', async () => {
		const productRepository = MockRespository();

		const usecase = new CreateProductUseCase(productRepository);

		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: output.id,
			name: output.name,
			price: output.price,
		});
	});
});

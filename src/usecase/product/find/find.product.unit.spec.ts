import FindProductUseCase from './find.product.usecase';

const product = {
	id: '3e1069a9-b091-4c08-80b5-0787ab7fd457',
	name: 'Notebook ACER',
	price: 4500,
};

const MockRespository = () => {
	return {
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit Test find product use case', () => {
	it('should find a product', async () => {
		const productRepository = MockRespository();

		await productRepository.create(product);

		const usecase = new FindProductUseCase(productRepository);

		const input = {
			id: product.id,
		};

		const output = {
			id: product.id,
			name: product.name,
			price: product.price,
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});

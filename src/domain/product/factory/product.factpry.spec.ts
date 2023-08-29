import ProductFactory from './product.factpry';

describe('Product factory unit test', () => {
	it('should create a product type a', () => {
		const product = ProductFactory.create('a', 'Product A', 10);

		expect(product.id).toBeDefined();
		expect(product.name).toBe('Product A');
		expect(product.price).toBe(10);
		expect(product.constructor.name).toBe('Product');
	});

	it('should create a product type B', () => {
		const product = ProductFactory.create('b', 'Product B', 50);

		expect(product.id).toBeDefined();
		expect(product.name).toBe('Product B');
		expect(product.price).toBe(50);
		expect(product.constructor.name).toBe('Product');
	});
	it('should throw an error when product type is not supported', () => {
		expect(() => ProductFactory.create('c', 'Product C', 2)).toThrowError(
			'Product type not supported'
		);
	});
});

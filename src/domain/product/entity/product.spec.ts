import Product from './product';

describe('Product Unit Tests', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			let product = new Product('', 'notebook', 3000);
		}).toThrowError('Id is required');
	});

	it('should throw error when Name is empty', () => {
		expect(() => {
			let product = new Product('01', '', 3000);
		}).toThrowError('Name is required');
	});

	it('should throw error when price is less than zero', () => {
		expect(() => {
			let product = new Product('01', 'notebook', -1);
		}).toThrowError('Price must be greate than zero');
	});

	it('should throw error when id, name is and price are empty', () => {
		expect(() => {
			let product = new Product('', '', -1);
		}).toThrowError(
			'product: Id is required,product: Name is required,product: Price must be greate than zero'
		);
	});

	it('should change name', () => {
		const product = new Product('02', 'Cadeira Gamer', 0);

		const newName = 'Cadeira de Escritorio';

		product.changeName(newName);

		expect(product.name).toBe(newName);
	});

	it('should change price', () => {
		const product = new Product('02', 'Cadeira Gamer', 0);

		const newPrice = 150;

		product.changePrice(newPrice);

		expect(product.price).toBe(newPrice);
	});
});

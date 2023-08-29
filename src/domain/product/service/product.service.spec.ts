import Product from '../entity/product';
import ProductService from './product.service';

describe('Product Service unit test', () => {
	it('should change the price of all products', () => {
		const prod1 = new Product('p1', 'Prod 1', 10);
		const prod2 = new Product('p2', 'Prod 2', 20);

		const products = [prod1, prod2];

		//Metodo statico
		ProductService.increasePrice(products, 100);

		expect(prod1.price).toBe(20);
		expect(prod2.price).toBe(40);
	});
});

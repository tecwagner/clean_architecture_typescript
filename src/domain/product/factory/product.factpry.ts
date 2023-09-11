import {v4 as uuid} from 'uuid';
import Product from '../entity/product';
import ProductInterfce from '../entity/product.interface';

export default class ProductFactory {
	public static create(name: string, price: number): Product {
		const product = new Product(uuid(), name, price);
		return product;
	}
	public static createAndType(
		type: string,
		name: string,
		price: number
	): ProductInterfce {
		switch (type) {
			case 'a':
				return new Product(uuid(), name, price);
			case 'b':
				return new Product(uuid(), name, price);

			default:
				throw new Error('Product type not supported');
		}
	}
}

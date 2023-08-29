import Product from '../entity/product';

// Não precisa guardar estado, por que ele realiza somente alteração de preço
export default class ProductService {
	static increasePrice(product: Product[], percentagem: number): void {
		product.forEach((product) => {
			product.changePrice((product.price * percentagem) / 100 + product.price);
		});
	}
}

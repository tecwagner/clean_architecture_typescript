import Product from '../../domain/product/entity/product';
import {OutputListProductDto} from '../product/list/list.product.dto';

export class OutputMapper {
	static toOutputMapper(product: Product[]): OutputListProductDto {
		return {
			products: product.map((product) => ({
				id: product.id,
				name: product.name,
				price: product.price,
			})),
		};
	}
}

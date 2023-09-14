import Order from '../../domain/checkout/entity/order';
import {OutputListOrderDto} from '../order/list/list.order.dto';

export class OutputMapper {
	static toOutputMapper(order: Order[]): OutputListOrderDto {
		return {
			orders: order.map((order) => ({
				id: order.id,
				customer_Id: order.customerId,
				items: order.items.map((item) => ({
					id: item.id,
					product_Id: item.productId,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
				})),
			})),
		};
	}
}

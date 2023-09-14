import Order from '../order';
import OrderInterface from '../order.interface';
import OrderItem from '../order_Item';

interface IOrderFactory {
	id: string;
	customer_Id: string;
	items: {
		id: string;
		product_Id: string;
		name: string;
		quantity: number;
		price: number;
	}[];
}

export default class OrderFactory {
	public static create(orderProps: IOrderFactory): Order {
		const items = orderProps.items.map((item) => {
			return new OrderItem(
				item.id,
				item.product_Id,
				item.name,
				item.quantity,
				item.price
			);
		});

		return new Order(orderProps.id, orderProps.customer_Id, items);
	}
}

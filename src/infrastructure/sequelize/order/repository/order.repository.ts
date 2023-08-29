import Order from '../../../../domain/checkout/entity/order';
import OrderItemModel from '../model/order-Item.model';
import OrderModel from '../model/order.model';
import OrderItem from '../../../../domain/checkout/entity/order_Item';

export default class OrderRepository {
	async create(order: Order): Promise<void> {
		try {
			await OrderModel.create(
				{
					id: order.id,
					customer_Id: order.customerId,
					total: order.total(),
					items: order.items.map((item) => ({
						id: item.id,
						name: item.name,
						price: item.price,
						product_Id: item.productId,
						quantity: item.quantity,
					})),
				},
				{
					include: [{model: OrderItemModel}],
				}
			);
		} catch (error) {
			throw new Error('Unable to created order ');
		}
	}

	async update(order: Order): Promise<void> {
		try {
			const orderModel = await OrderModel.findOne({
				where: {id: order.id},
				include: [OrderItemModel],
			});
			console.log('RepositoriesOrderUpdate:', orderModel);
			if (orderModel) {
				const items: OrderItem[] = order.items.map((item) => {
					return new OrderItem(
						item.id,
						item.productId,
						item.name,
						item.quantity,
						item.price
					);
				});

				console.log('items', orderModel);
				await orderModel.update({
					id: order.id,
					customer_Id: order.customerId,
					total: order.total(),
					items,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

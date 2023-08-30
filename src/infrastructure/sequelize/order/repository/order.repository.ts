import Order from '../../../../domain/checkout/entity/order';
import OrderItemModel from '../model/order-Item.model';
import OrderModel from '../model/order.model';
import OrderItem from '../../../../domain/checkout/entity/order_Item';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';

export default class OrderRepository implements OrderRepositoryInterface {
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
			throw new Error('Unable to created order');
		}
	}

	async update(order: Order): Promise<void> {
		try {
			const orderModel = await OrderModel.findOne({
				where: {id: order.id},
				include: [OrderItemModel],
			});
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
				await orderModel.update({
					id: order.id,
					customer_Id: order.customerId,
					total: order.total(),
					items,
				});
			}
		} catch (error) {
			throw new Error('Unable to updated order');
		}
	}

	async find(id: string): Promise<Order> {
		try {
			const orderModel = await OrderModel.findOne({
				where: {id: id},
				include: [OrderItemModel],
			});

			console.log(orderModel);

			if (!orderModel) {
				throw new Error('Unable to find order items');
			}

			const items = orderModel.items.map((item) => {
				return new OrderItem(
					item.id,
					item.product_Id,
					item.name,
					item.quantity,
					item.price
				);
			});
			return new Order(orderModel!.id, orderModel!.customer_Id, items);
		} catch (error) {
			throw new Error('Unable to find order');
		}
	}

	async findAll(): Promise<Order[]> {
		try {
			const orderModels = await OrderModel.findAll();

			const orders = orderModels.map((orderModel) => {
				const orderItems = orderModel.items.map(
					(item) =>
						new OrderItem(
							item.id,
							item.product_Id,
							item.name,
							item.quantity,
							item.price
						)
				);
				return new Order(orderModel.id, orderModel.customer_Id, orderItems);
			});

			return orders;
		} catch (error) {
			console.log(error);
			throw new Error('Unable to findALL order');
		}
	}
}

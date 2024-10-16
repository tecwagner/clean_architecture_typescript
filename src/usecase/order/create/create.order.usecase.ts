import OrderFactory from '../../../domain/checkout/entity/factory/order.factory';
import OrderItem from '../../../domain/checkout/entity/order_Item';
import OrderRepositoryInterface from '../../../domain/checkout/repository/order-repository.interface';
import {InputCreateOrderDto, OutputCreateOrderDto} from './create.order.dto';

export default class CreateOrderUseCase {
	private _orderRepository: OrderRepositoryInterface;

	constructor(orderRepository: OrderRepositoryInterface) {
		this._orderRepository = orderRepository;
	}

	async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {
		
		if (!input.customerId || !Array.isArray(input.items) || input.items.length === 0) {
			throw new Error('Invalid order input data.');
		}

		const order = OrderFactory.create({		
			id: input.id,	
			customerId: input.customerId,
			items: input.items.map((item) => ({
				id: item.id,
				productId: item.productId,
				name: item.name,
				quantity: item.quantity,
				price: item.price
			}))
		});

		await this._orderRepository.create(order);

		return {
			id: order.id,
			customerId: order.customerId,
			items: order.items,
			total: order.total(),
		};
	}
}

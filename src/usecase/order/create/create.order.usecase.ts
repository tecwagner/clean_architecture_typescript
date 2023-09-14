import OrderFactory from '../../../domain/checkout/entity/factory/order.factory';
import OrderRepositoryInterface from '../../../domain/checkout/repository/order-repository.interface';
import {InputCreateOrderDto, OutputCreateOrderDto} from './create.order.dto';

export default class CreateOrderUseCase {
	private _orderRepository: OrderRepositoryInterface;

	constructor(orderRepository: OrderRepositoryInterface) {
		this._orderRepository = orderRepository;
	}

	async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {
		const order = OrderFactory.create(input);

		await this._orderRepository.create(order);

		return {
			id: order.id,
            customer_Id: order.customerId,            
			items: order.items,
			total: order.total(),
		};
	}
}

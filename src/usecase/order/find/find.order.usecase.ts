import OrderRepositoryInterface from '../../../domain/checkout/repository/order-repository.interface';
import {InputFindOrderDto, OutputFindOrderDto} from './find.order.dto';

export default class FindOrderUseCase {
	private _orderRepository: OrderRepositoryInterface;

	constructor(orderRepository: OrderRepositoryInterface) {
		this._orderRepository = orderRepository;
	}

	async execute(input: InputFindOrderDto): Promise<OutputFindOrderDto> {
		const order = await this._orderRepository.find(input.id);

		return {
			id: order.id,
			customer_Id: order.customerId,			
			items: order.items.map((item) => ({
				id: item.id,
				product_Id: item.productId,
				name: item.name,
				quantity: item.quantity,
				price: item.price,
			})),
			total: order.total(),
		};
	}
}

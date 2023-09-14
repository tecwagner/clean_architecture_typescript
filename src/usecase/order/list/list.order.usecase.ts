import OrderRepositoryInterface from '../../../domain/checkout/repository/order-repository.interface';
import {OutputMapper} from '../../mappers/mapper.order';
import {InputListOrderDto} from './list.order.dto';

export default class ListOrdersUseCase {
	private _orderRepository: OrderRepositoryInterface;

	constructor(orderRepository: OrderRepositoryInterface) {
		this._orderRepository = orderRepository;
	}

	async execute(input: InputListOrderDto): Promise<InputListOrderDto> {
		const orders = await this._orderRepository.findAll();

		console.log('list:', orders);

		return OutputMapper.toOutputMapper(orders);
	}
}

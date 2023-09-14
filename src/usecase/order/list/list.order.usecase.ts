import OrderRepositoryInterface from '../../../domain/checkout/repository/order-repository.interface';
import {OutputMapper} from '../../mappers/mapper.order';
import {InputListOrderDto, OutputListOrderDto} from './list.order.dto';

export default class ListOrdersUseCase {
	private _orderRepository: OrderRepositoryInterface;

	constructor(orderRepository: OrderRepositoryInterface) {
		this._orderRepository = orderRepository;
	}

	async execute(input: InputListOrderDto): Promise<OutputListOrderDto> {
		const orders = await this._orderRepository.findAll();

		return OutputMapper.toOutputMapper(orders);
	}
}

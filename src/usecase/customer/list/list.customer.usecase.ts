import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {OutputMapper} from '../../mappers/mapper.customer';
import {InputListCustomerDto, OutputListCustomerDto} from './list.customer.dto';

export default class ListCustomersUseCase {
	private _customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this._customerRepository = customerRepository;
	}

	async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
		const customers = await this._customerRepository.findAll();
		console.log(customers);

		return OutputMapper.toOutputMapper(customers);
	}
}

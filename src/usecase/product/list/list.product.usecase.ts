import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import {OutputMapper} from '../../mappers/mapper.product';
import {InputListProductDto, OutputListProductDto} from './list.product.dto';

export default class ListProductsUseCase {
	private _productRepository: ProductRepositoryInterface;

	constructor(productRepository: ProductRepositoryInterface) {
		this._productRepository = productRepository;
	}

	async execute(input: InputListProductDto): Promise<OutputListProductDto> {
		const products = await this._productRepository.findAll();

		return OutputMapper.toOutputMapper(products);
	}
}

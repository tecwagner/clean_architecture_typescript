import Product from '../entity/product';
import RepositoryInterface from '../../@shared/repository/repository-inteface';

export default interface ProductRepositoryInterface
	extends RepositoryInterface<Product> {}

import Order from '../entity/order';
import RepositoryInterface from '../../@shared/repository/repository-inteface';

export default interface OrderRepositoryInterface
	extends RepositoryInterface<Order> {}

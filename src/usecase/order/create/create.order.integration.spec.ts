import {Sequelize} from 'sequelize-typescript';
import OrderModel from '../../../infrastructure/sequelize/order/model/order.model';
import OrderRepository from '../../../infrastructure/sequelize/order/repository/order.repository';
import Order from '../../../domain/checkout/entity/order';
import OrderItem from '../../../domain/checkout/entity/order_Item';
import CreateOrderUseCase from './create.order.usecase';
import OrderItemModel from '../../../infrastructure/sequelize/order/model/order-Item.model';
import CustomerModel from '../../../infrastructure/sequelize/customer/model/customer.model';
import ProductModel from '../../../infrastructure/sequelize/product/model/product.model';
import {v4 as uuid} from 'uuid';
import CustomerRepository from '../../../infrastructure/sequelize/customer/repository/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import ProductRepository from '../../../infrastructure/sequelize/product/repository/product.repository';

describe('Integration test create order use case', () => {
	let sequelize: Sequelize;

	// Config to sequelize instance
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: {force: true},
		});

		//adicionando o model ao test
		sequelize.addModels([
			CustomerModel,
			ProductModel,
			OrderModel,
			OrderItemModel,
		]);
		await sequelize.sync();
	});
	afterEach(async () => {
		await sequelize.close();
	});

	it('should create a new order integration model', async () => {
		const orderRepository = new OrderRepository();
		const customerRepository = new CustomerRepository();

		const customer = new Customer('123', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const items = [
			new OrderItem('IT-11', 'PRO-22', 'Cadeira Gamer', 1, 100),
			new OrderItem('IT-12', 'PRO-23', 'Mesa para Gamer', 1, 300),
		];
		const order = new Order('OR-123', '123', items);

		const input = {
			id: order.id,
			customer_Id: order.customerId,
			items: order.items.map((item) => ({
				id: item.id,
				product_Id: item.productId,
				name: item.name,
				quantity: item.quantity,
				price: item.price,
				order_Id: order.id,
			})),
		};
		console.log('test:', input);
		await orderRepository.create(order);
		const usecase = new CreateOrderUseCase(orderRepository);
		const output = await usecase.execute(input);

		const expectedOutput = {
			id: output.id,
			customer_Id: output.customer_Id,
			items: output.items.map((item) => ({
				id: item.id,
				product_Id: item.productId,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				order_id: output.id,
			})),
		};

		expect(output).toStrictEqual(expectedOutput);
	});
});

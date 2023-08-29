import {Sequelize} from 'sequelize-typescript';
import OrderRepository from './order.repository';
import CustomerModel from '../../customer/model/customer.model';
import ProductModel from '../../product/model/product.model';
import OrderModel from '../model/order.model';
import OrderItemModel from '../model/order-Item.model';
import CustomerRepository from '../../customer/repository/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import ProductRepository from '../../product/repository/product.repository';
import Product from '../../../../domain/product/entity/product';
import OrderItem from '../../../../domain/checkout/entity/order_Item';
import Order from '../../../../domain/checkout/entity/order';
import ProductService from '../../../../domain/product/service/product.service';

describe('Order repository test', () => {
	let sequelize: Sequelize;

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

	it('should be able to create a new order', async () => {
		// Criando um cliente para o pedido
		const customerRepository = new CustomerRepository();
		const customer = new Customer('C1', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
		customer.Address = address;
		await customerRepository.create(customer);

		// Criando um produto para o pedido
		const productRepository = new ProductRepository();
		const product = new Product('P1', 'Camisa P', 60);
		await productRepository.create(product);

		// Criando um itens para o pedido
		const orderItem = new OrderItem(
			'I1',
			product.id,
			product.name,
			2,
			product.price
		);

		const order = new Order('O1', 'C1', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		// Recuperando os dados do pedido
		const orderModel = await OrderModel.findOne({
			where: {
				id: order.id,
			},
			include: ['items'],
		});

		expect(orderModel?.toJSON()).toMatchObject({
			id: 'O1',
			customer_Id: order.customerId,
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					product_Id: orderItem.productId,
					name: orderItem.name,
					quantity: orderItem.quantity,
					price: orderItem.price,
				},
			],
		});
	});

	it('should update add mush item order', async () => {
		// Criando um cliente para o pedido
		const customerRepository = new CustomerRepository();
		const customer = new Customer('C1', 'Wagner Oliveira');
		const address = new Address('Onofre', 123, '14405123', 'Franca-SP');
		customer.Address = address;
		await customerRepository.create(customer);

		// Criando um produto para o pedido
		const productRepository = new ProductRepository();
		const product = new Product('P1', 'Camisa P', 60);
		await productRepository.create(product);

		// Criando um itens para o pedido
		const orderItem = new OrderItem(
			'I1',
			product.id,
			product.name,
			2,
			product.price
		);

		const order = new Order('O1', 'C1', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		// Recuperando os dados do pedido
		const orderModel = await OrderModel.findOne({
			where: {
				id: order.id,
			},
			include: ['items'],
		});

		expect(orderModel?.toJSON()).toEqual({
			id: order.id,
			customer_Id: order.customerId,
			total: order.total(),
			items: [orderItem],
		});

		const product2 = new Product('P2', 'Camisa M', 60);
		await productRepository.create(product2);

		const orderItem2 = new OrderItem(
			'I2',
			product2.id,
			product2.name,
			2,
			product2.price
		);

		const orderNew = new Order('O1', 'C1', [orderItem, orderItem2]);

		await orderRepository.update(orderNew);

		// Recuperando os dados do pedido
		const orderModelNew = await OrderModel.findOne({
			where: {
				id: orderNew.id,
			},
			include: ['items', 'items'],
		});

		expect(orderModelNew?.toJSON()).toEqual({
			id: orderNew.id,
			customer_Id: orderNew.customerId,
			total: orderNew.total(),
			items: [orderItem, orderItem2],
		});
	});
});

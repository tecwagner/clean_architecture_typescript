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

		const orderModel = await OrderModel.findOne({
			where: {
				id: order.id,
			},
			include: ['items'],
		});
		expect(orderModel?.toJSON()).toMatchObject({
			id: 'O1',
			customer_Id: (await order).customerId,
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

		ProductService.increasePrice([product], 50);

		// Criando um itens para o pedido
		const orderItem = new OrderItem(
			'I1',
			product.id,
			product.name,
			2,
			product.price
		);

		orderItem.changeToAddQuantity(2);
		orderItem.changePrice(35);

		const order = new Order('O1', 'C1', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		await orderRepository.update(order);
		// Recuperando os dados do pedido
		const orderModel = await OrderModel.findOne({
			where: {
				id: order.id,
			},
			include: ['items'],
		});

		expect(orderModel?.toJSON()).toMatchObject({
			id: order.id,
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

	it('should find to id order', async () => {
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

		ProductService.increasePrice([product], 50);

		// Criando um itens para o pedido
		const orderItem = new OrderItem(
			'I1',
			product.id,
			product.name,
			2,
			product.price
		);

		orderItem.changeToAddQuantity(2);
		orderItem.changePrice(35);

		const order = new Order('O1', 'C1', [orderItem]);

		console.log('createOrder:', order);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		// Recuperando os dados do pedido
		const orderModel = await OrderModel.findOne({
			where: {
				id: order.id,
			},
			include: ['items'],
		});

		const orderRepo = await orderRepository.find(order.id);

		expect(orderModel?.toJSON()).toMatchObject({
			id: orderRepo.id,
			customer_Id: orderRepo.customerId,
			total: orderRepo.total(),
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

	it('should return an array of orders', async () => {
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

		ProductService.increasePrice([product], 10);

		// Criando um itens para o pedido
		const orderItem = new OrderItem(
			'I1',
			product.id,
			product.name,
			2,
			product.price
		);
		const orderItem2 = new OrderItem(
			'I2',
			product.id,
			product.name,
			2,
			product.price
		);

		const order = new Order('O1', 'C1', [orderItem, orderItem2]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		// Recuperando os dados do pedido
		const ordersModel = await OrderModel.findAll({
			include: ['items'],
		});

		expect(ordersModel).toHaveLength(1);

		expect(ordersModel).toMatchObject([
			{
				id: 'O1',
				customer_Id: 'C1',
				total: order.total(),
				items: [
					{
						id: orderItem.id,
						product_Id: orderItem.productId,
						name: orderItem.name,
						quantity: orderItem.quantity,
						price: orderItem.price,
					},
					{
						id: orderItem2.id,
						product_Id: orderItem2.productId,
						name: orderItem2.name,
						quantity: orderItem2.quantity,
						price: orderItem2.price,
					},
				],
			},
		]);
	});
});

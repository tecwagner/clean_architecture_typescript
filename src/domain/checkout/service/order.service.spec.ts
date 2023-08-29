import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order_Item';

import OrderService from './order.service';

describe('Order Service unit test', () => {
	it('should place an order  throw error when item is empty', () => {
		expect(() => {
			const customer = new Customer('C1', 'Cli 01');
			OrderService.placeOrder(customer, []);
		}).toThrowError('Order must have at least one item');
	});
	it('should place an order', () => {
		const customer = new Customer('C1', 'Cli 01');
		const item1 = new OrderItem('O1', 'prod 1', 'item 1', 2, 10);

		const order = OrderService.placeOrder(customer, [item1]);

		expect(customer.rewardPoints).toBe(10);
		expect(order.total()).toBe(20);
	});

	it('should get total of all orders', () => {
		const item1 = new OrderItem('I1', 'P1', 'Prod 1', 2, 10);
		const item2 = new OrderItem('I2', 'P2', 'Prod 2', 2, 20);

		const order = new Order('O1', 'Cli 1', [item1]);
		const order2 = new Order('O2', 'Cli 2', [item2]);

		const total = OrderService.total([order, order2]);

		expect(total).toBe(60);
	});
});

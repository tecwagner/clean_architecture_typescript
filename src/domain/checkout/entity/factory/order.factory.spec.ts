import {v4 as uuid} from 'uuid';
import OrderFactory from './order.factory';

describe('Order factory unit test', () => {
	it('should create an order', () => {
		const orderMock = {
			id: uuid(),
			customerId: uuid(),
			items: [
				{
					id: uuid(),
					productId: uuid(),
					name: 'Product 1',
					quantity: 1,
					price: 100,
				},
			],
		};

		const order = OrderFactory.create(orderMock);

		expect(order.id).toEqual(orderMock.id);
		expect(order.customerId).toEqual(orderMock.customerId);
		expect(order.items.length).toEqual(orderMock.items.length);
	});
});

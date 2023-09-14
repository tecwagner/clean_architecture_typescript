import {v4 as uuid} from 'uuid';
import ListOrdersUseCase from './list.order.usecase';
import OrderFactory from '../../../domain/checkout/entity/factory/order.factory';

const order = {
	id: uuid(),
	customerId: uuid(),
	items: [
		{
			id: uuid(),
			productId: uuid(),
			name: 'noteboook',
			price: 4000,
			quantity: 1,
		},
		{
			id: uuid(),
			productId: uuid(),
			name: 'monitor led 30 polegadas',
			price: 4000,
			quantity: 1,
		},
	],
};
const order1 = {
	id: uuid(),
	customerId: uuid(),
	items: [
		{
			id: uuid(),
			productId: uuid(),
			name: 'Livro Go lang',
			price: 40,
			quantity: 1,
		},
		{
			id: uuid(),
			productId: uuid(),
			name: 'Livro Domain Drive Designer',
			price: 98,
			quantity: 1,
		},
	],
};

const orderFactory = OrderFactory.create(order);
const orderFactory1 = OrderFactory.create(order1);

const MockRespository = () => {
	return {
		find: jest.fn(),
		findAll: jest
			.fn()
			.mockReturnValue(Promise.resolve([orderFactory, orderFactory1])),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit tests for list orders use case', () => {
	it('should list orders', async () => {
		const mockRespository = MockRespository();
		const usecase = new ListOrdersUseCase(mockRespository);

		const output = await usecase.execute({});

		// console.log(output.orders.length);
		expect(output.orders.length).toBe(2);

		expect(output.orders[0].id).toBe(order.id);
		expect(output.orders[0].customerId).toBe(order.customerId);

		expect(output.orders[1].id).toBe(order1.id);
		expect(output.orders[1].customerId).toBe(order1.customerId);
	});
});

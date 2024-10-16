import {v4 as uuid} from 'uuid';
import FindOrderUseCase from './find.order.usecase';

const order = {
	id: uuid(),
	customerId: uuid(),
	items: [
		{
			id: uuid(),
			productId: uuid(),
			name: 'notebook',
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
	total: function () {
		return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	},
};

const MockRespository = () => {
	return {
		find: jest.fn().mockReturnValue(Promise.resolve(order)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit Test find order use case', () => {
	it('should find a new order', async () => {
		const orderRepository = MockRespository();

		const usecase = new FindOrderUseCase(orderRepository);

		const input = {
			id: order.id,
		};

		const output = {
			id: order.id,
			customer_Id: order.customerId,	
			items: order.items.map((item) => ({
				id: item.id,
				product_Id: item.productId,
				name: item.name,
				quantity: item.quantity,
				price: item.price,
			})),
			total: order.total(),
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});

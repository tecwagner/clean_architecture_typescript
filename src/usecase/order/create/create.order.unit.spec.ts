import CreateOrderUseCase from './create.order.usecase';
import {v4 as uuid} from 'uuid';

const input = {
	id: uuid(),
	customer_Id: uuid(),
	items: [
		{
			id: uuid(),
			product_Id: uuid(),
			name: 'noteboook',
			price: 4000,
			quantity: 1,
		},
		{
			id: uuid(),
			product_Id: uuid(),
			name: 'monitor led 30 polegadas',
			price: 4000,
			quantity: 1,
		},
	],
};

const MockRespository = () => {
	return {
		find: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn().mockReturnValue(Promise.resolve(input)),
		update: jest.fn(),
	};
};

describe('Unit Test create order use case', () => {
	it('should create a new order', async () => {
		const orderRepository = MockRespository();

		const usecase = new CreateOrderUseCase(orderRepository);

		const output = await usecase.execute(input);

		expect(output).toMatchObject({
			id: output.id,
			customer_Id: output.customer_Id,
			items: [
				{
					id: output.items[0].id,
					productId: output.items[0].productId,
					name: output.items[0].name,
					price: output.items[0].price,
					quantity: output.items[0].quantity,
				},
				{
					id: output.items[1].id,
					name: output.items[1].name,
					price: output.items[1].price,
					productId: output.items[1].productId,
					quantity: output.items[1].quantity,
				},
			],
		});
	});
});

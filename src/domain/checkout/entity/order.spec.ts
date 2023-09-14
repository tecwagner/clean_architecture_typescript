import Order from './order';
import OrderItem from './order_Item';

describe('Order Unit Tests', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			let order = new Order('', '123', []);
		}).toThrowError('order: Id is required');
	});

	it('should throw error when customer id is empty', () => {
		expect(() => {
			let order = new Order('1', '', []);
		}).toThrowError('order: Customer Id is required');
	});

	it('should throw error when Item qtd is empty', () => {
		expect(() => {
			let order = new Order('1', '321', []);
		}).toThrowError('order: Item qtd must be greater than 0');
	});

	it('should throw error when id, customer, Item qtd is empty', () => {
		expect(() => {
			let order = new Order('', '', []);
		}).toThrowError(
			'order: Id is required,order: Customer Id is required,order: Item qtd must be greater than 0'
		);
	});

	it('should calculate total', () => {
		const item = new OrderItem('i1', 'Item 1', 'p1', 2, 100);

		const order = new Order('01', '321', [item]);

		let total = order.total();

		expect(total).toBe(200);

		const item2 = new OrderItem('i2', 'Item 1', 'p2', 2, 150);

		const order2 = new Order('02', 'c1', [item, item2]);

		total = order2.total();

		expect(total).toBe(500);
	});

	it('should add items to order', () => {
		const item = new OrderItem('i1', 'Item 1', 'p1', 2, 100);

		const order = new Order('01', '321', [item]);

		item.changeToAddQuantity(1);

		const total = order.total();

		expect(total).toBe(300);
	});

	it('should decrease items to order', () => {
		const item = new OrderItem('i1', 'Item 1', 'p1', 3, 100);

		const order = new Order('01', '321', [item]);

		item.changeToDecreaseQuantity(2);

		const total = order.total();

		expect(total).toBe(100);
	});

	it('should throw error if then item qte is less or equal zero', () => {
		expect(() => {
			const item = new OrderItem('i1', 'Item 1', 'p1', 0, 100);
			const order = new Order('o3', 'cli 3', [item]);
		}).toThrowError('Quantity must be greater than 0');
	});
});

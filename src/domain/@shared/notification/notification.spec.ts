import Notification from './notification';

describe('Unit tests for notifications', () => {
	it('should create errors', () => {
		const notification = new Notification();
		const error = {
			context: 'customer',
			message: 'error message',
		};

		notification.addError(error);

		expect(notification.messages('customer')).toBe('customer: error message,');

		const error2 = {
			context: 'customer',
			message: 'error message2',
		};

		notification.addError(error2);

		expect(notification.messages('customer')).toBe(
			'customer: error message,customer: error message2,'
		);

		const error3 = {
			context: 'product',
			message: 'error message3',
		};

		notification.addError(error3);

		expect(notification.messages()).toBe(
			'customer: error message,customer: error message2,product: error message3,'
		);
	});

	it('should check if notification has at least one error message', () => {
		const notification = new Notification();
		const error = {
			context: 'customer',
			message: 'error message',
		};

		notification.addError(error);

		expect(notification.hasErrors()).toBe(true);
	});

	it('should get all errors props', () => {
		const notification = new Notification();
		const error = {
			context: 'customer',
			message: 'error message',
		};

		notification.addError(error);

		expect(notification.errors()).toEqual([error]);
	});
});

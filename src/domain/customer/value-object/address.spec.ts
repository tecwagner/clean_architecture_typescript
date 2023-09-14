import Address from './address';

describe('Address unit test', () => {
	it('should throw error when street is empty ', () => {
		expect(() => {
			let address = new Address('', 1234, '14408050', 'Franca');
		}).toThrowError('address: Street is required');
	});

	it('should throw error when number is empty ', () => {
		expect(() => {
			let address = new Address('Rua Tiradentes', 0, '14408050', 'Franca');
		}).toThrowError('address: Number is required');
	});

	it('should throw error when zipcode is empty ', () => {
		expect(() => {
			let address = new Address('Rua Tiradentes', 1230, '', 'Franca');
		}).toThrowError('address: Zip is required');
	});
	it('should throw error when city is empty ', () => {
		expect(() => {
			let address = new Address('Rua Tiradentes', 1230, '14408050', '');
		}).toThrowError('address: City is required');
	});

	it('should throw error when street, number, zipcode, city is empty ', () => {
		expect(() => {
			let address = new Address('', 0, '', '');
		}).toThrowError(
			'address: Street is required,address: Number is required,address: Zip is required,address: City is required'
		);
	});

	it('should return toString', () => {
		const address = new Address('Rua Tiradentes', 1230, '14408050', 'Franca');

		expect(address.toString());
	});
});

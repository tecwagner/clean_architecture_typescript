import Address from './address';

describe('Address unit test', () => {
	it('should throw error when street is empty ', () => {
		expect(() => {
			let address = new Address('', 1234, '14408050', 'Franca');
		}).toThrowError('Street is required');
	});
	it('should throw error when number is empty ', () => {
		expect(() => {
			let address = new Address('Rua Tiradentes', 0, '14408050', 'Franca');
		}).toThrowError('Number is required');
	});
	it('should throw error when zipcode is empty ', () => {
		expect(() => {
			let address = new Address('Rua Tiradentes', 1230, '', 'Franca');
		}).toThrowError('Zip is required');
	});
	it('should throw error when zipcode is empty ', () => {
		expect(() => {
			let address = new Address('Rua Tiradentes', 1230, '14408050', '');
		}).toThrowError('City is required');
	});
	it('should return toString', () => {
		const address = new Address('Rua Tiradentes', 1230, '14408050', 'Franca');
		
		expect(address.toString())
	});
});

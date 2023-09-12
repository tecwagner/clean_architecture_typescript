import {app, sequelize} from '../express';
import request from 'supertest';
import {customerRoute} from '../routes/customer/customer.route';

describe('E2E test for customer', () => {
	// Inicia o squelize
	beforeEach(async () => {
		await sequelize.sync({force: true});
	});

	// Ao final feche a conexão
	afterAll(async () => {
		await sequelize.close();
	});

	it('should createa a customer', async () => {
		const response = await request(app)
			.post('/customer')
			.send({
				name: 'Wagner Oliveira',
				address: {
					street: 'Onofre',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response.status).toBe(201);
		expect(response.body.name).toBe('Wagner Oliveira');
		expect(response.body.address.street).toBe('Onofre');
		expect(response.body.address.number).toBe(1234);
		expect(response.body.address.zip).toBe('14405123');
		expect(response.body.address.city).toBe('Franca-SP');
	});

	it('should not create a customer', async () => {
		const response = await request(app).post('/customer').send({
			name: 'Wagner Oliveira',
		});

		expect(response.status).toBe(500);
	});

	it('should list all customers', async () => {
		const response = await request(app)
			.post('/customer')
			.send({
				name: 'Wagner Oliveira',
				address: {
					street: 'Onofre',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response.status).toBe(201);

		const response2 = await request(app)
			.post('/customer')
			.send({
				name: 'Amanda Daniele Silva',
				address: {
					street: 'Onofre Raimundo Braga',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response2.status).toBe(201);

		const listResponse = await request(app).get('/customer').send();

		expect(listResponse.status).toBe(200);
		expect(listResponse.body.customers.length).toBe(2);

		const customer = listResponse.body.customers[0];
		expect(customer.name).toBe('Wagner Oliveira');
		expect(customer.address.street).toBe('Onofre');

		const customer1 = listResponse.body.customers[1];
		expect(customer1.name).toBe('Amanda Daniele Silva');
		expect(customer1.address.street).toBe('Onofre Raimundo Braga');
	});

	it('should find id a customer', async () => {
		const response = await request(app)
			.post('/customer')
			.send({
				name: 'Wagner Oliveira',
				address: {
					street: 'Onofre',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response.status).toBe(201);

		const findResponse = await request(app).get(
			`/customer/${response.body.id}`
		);

		expect(findResponse.status).toBe(200);
		expect(findResponse.body.name).toBe('Wagner Oliveira');
		expect(findResponse.body.address.street).toBe('Onofre');
		expect(findResponse.body.address.number).toBe(1234);
		expect(findResponse.body.address.zip).toBe('14405123');
		expect(findResponse.body.address.city).toBe('Franca-SP');
	});
	it('should not find id a customer', async () => {
		const response = await request(app)
			.post('/customer')
			.send({
				id: '123',
				name: 'Wagner Oliveira',
				address: {
					street: 'Onofre',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response.status).toBe(201);

		const findResponse = await request(app).get(`/customer/1234`);

		expect(findResponse.status).toBe(500);
	});

	it('should update a customer', async () => {
		const response = await request(app)
			.post('/customer')
			.send({
				name: 'Wagner Oliveira',
				address: {
					street: 'Onofre',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response.status).toBe(201);

		const response1 = await request(app)
			.put('/customer')
			.send({
				id: response.body.id,
				name: 'Wagner Oliveira Rodrigues',
				address: {
					street: 'Onofre Raimundo Braga',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		expect(response1.status).toBe(201);

		await request(app).put(`/customer`);

		expect(response1.status).toBe(201);
		expect(response1.body.name).toBe('Wagner Oliveira Rodrigues');
		expect(response1.body.address.street).toBe('Onofre Raimundo Braga');
		expect(response1.body.address.number).toBe(1234);
		expect(response1.body.address.zip).toBe('14405123');
		expect(response1.body.address.city).toBe('Franca-SP');
	});
	it('should erro 500 update a customer', async () => {
		const response1 = await request(app)
			.put('/customer')
			.send({
				id: '123',
				name: 'Wagner Oliveira Rodrigues',
				address: {
					street: 'Onofre Raimundo Braga',
					number: 1234,
					zip: '14405123',
					city: 'Franca-SP',
				},
			});

		await request(app).put(`/customer`);

		expect(response1.status).toBe(500);
	});
});

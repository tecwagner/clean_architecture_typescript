import {app, sequelize} from '../../express';
import request from 'supertest';

describe('E2E test for product', () => {
	// Inicia o squelize
	beforeEach(async () => {
		await sequelize.sync({force: true});
	});

	// Ao final feche a conexão
	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a product', async () => {
		const response = await request(app).post('/product').send({
			name: 'Camisa Oficial do Palmeira',
			price: 250,
		});

		expect(response.status).toBe(201);
		expect(response.body.name).toBe('Camisa Oficial do Palmeira');
		expect(response.body.price).toBe(250);
	});

	it('should erro 500 create a product', async () => {
		const response = await request(app).post('/product').send();

		expect(response.status).toBe(500);
	});

	it('should list all products', async () => {
		const response1 = await request(app).post('/product').send({
			name: 'Camisa Oficial do Palmeira',
			price: 250,
		});

		expect(response1.status).toBe(201);

		const response2 = await request(app).post('/product').send({
			name: 'Camisa Oficial da Seleção Brasileira',
			price: 150,
		});
		expect(response2.status).toBe(201);

		const listResponse = await request(app).get('/product').send();

		expect(listResponse.status).toBe(200);
		expect(listResponse.body.products.length).toBe(2);

		const product1 = await listResponse.body.products[0];
		expect(product1.name).toBe('Camisa Oficial do Palmeira');
		expect(product1.price).toBe(250);

		const product2 = await listResponse.body.products[1];
		expect(product2.name).toBe('Camisa Oficial da Seleção Brasileira');
		expect(product2.price).toBe(150);
	});

	it('should find id a product', async () => {
		const response = await request(app).post('/product').send({
			name: 'Camisa Oficial do Palmeira',
			price: 250,
		});

		expect(response.status).toBe(201);

		const findResponse = await request(app).get(`/product/${response.body.id}`);

		expect(findResponse.status).toBe(200);
		expect(findResponse.body.name).toBe('Camisa Oficial do Palmeira');
		expect(findResponse.body.price).toBe(250);
	});

	it('should erro 500 find id a product', async () => {
		const response = await request(app).post('/product').send({
			name: 'Camisa Oficial do Palmeira',
			price: 250,
		});

		expect(response.status).toBe(201);

		const findResponse = await request(app).get(`/product/123`);

		expect(findResponse.status).toBe(500);
	});

	it('should update a product', async () => {
		const response = await request(app).post('/product').send({
			name: 'Camisa Oficial do Palmeira',
			price: 250,
		});

		expect(response.status).toBe(201);

		const response1 = await request(app).put('/product').send({
			id: response.body.id,
			name: 'Camisa Oficial Palmeira Torcedor',
			price: 190,
		});

		expect(response1.status).toBe(201);

		await request(app).put('/product');

		expect(response1.body.name).toBe('Camisa Oficial Palmeira Torcedor');
		expect(response1.body.price).toBe(190);
	});

	it('should error 500 update a product', async () => {
		const response1 = await request(app).put('/product').send({
			id: 123,
			name: 'Camisa Oficial Palmeira Torcedor',
			price: 190,
		});

		await request(app).put('/product');

		expect(response1.status).toBe(500);
	});
});

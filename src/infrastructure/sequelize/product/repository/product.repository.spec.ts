import {Sequelize} from 'sequelize-typescript';
import ProductRepository from './product.repository';
import ProductModel from '../model/product.model';
import Product from '../../../../domain/product/entity/product';

describe('Product repository test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: {force: true},
		});

		//adicionando o model ao test
		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});
	afterEach(async () => {
		await sequelize.close();
	});

	it('should create a Product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('P1', 'Camisa P', 60);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({where: {id: 'P1'}});

		expect(productModel?.toJSON()).toStrictEqual({
			id: 'P1',
			name: 'Camisa P',
			price: 60,
		});
	});

	it('should update a Product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('P1', 'Camisa P', 60);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({where: {id: 'P1'}});

		expect(productModel?.toJSON()).toStrictEqual({
			id: 'P1',
			name: 'Camisa P',
			price: 60,
		});

		product.changeName('Camisa M');
		product.changePrice(70);

		await productRepository.update(product);

		const productUpdate = await ProductModel.findOne({where: {id: 'P1'}});

		expect(productUpdate?.toJSON()).toStrictEqual({
			id: 'P1',
			name: 'Camisa M',
			price: 70,
		});
	});

	it('should find a Product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('P1', 'Camisa P', 60);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({where: {id: 'P1'}});

		const foundProduct = await productRepository.find('P1');

		expect(productModel?.toJSON()).toStrictEqual({
			id: foundProduct.id,
			name: foundProduct.name,
			price: foundProduct.price,
		});
	});

	it('should findAll Products', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('P1', 'Camisa P', 60);
		await productRepository.create(product);

		const product2 = new Product('P2', 'Camisa M', 70);
		await productRepository.create(product2);

		const foundProduct = await productRepository.findAll();
		const products = [product, product2];

		expect(products).toEqual(foundProduct);
	});
});

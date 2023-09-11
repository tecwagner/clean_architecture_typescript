import {Sequelize} from 'sequelize-typescript';
import ProductFactory from '../../../domain/product/factory/product.factpry';
import ListProductsUseCase from './list.product.usecase';
import ProductModel from '../../../infrastructure/sequelize/product/model/product.model';
import ProductRepository from '../../../infrastructure/sequelize/product/repository/product.repository';
import Product from '../../../domain/product/entity/product';

describe('Intergration tests for list products use case', () => {
	let sequelize: Sequelize;

	// Config to sequelize instance
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: {force: true},
		});

		//adicionando o model ao test
		await sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});
	afterEach(async () => {
		await sequelize.close();
	});
	it('should list products created factory', async () => {
		const productRepository = new ProductRepository();
		const product1 = ProductFactory.create('Celular Moto G-20', 2000);
		const product2 = ProductFactory.create('Notebook Aple', 7000);

		await productRepository.create(product1);
		await productRepository.create(product2);

		const usecase = new ListProductsUseCase(productRepository);

		const output = await usecase.execute({});

		expect(output.products.length).toBe(2);

		expect(output.products[0].id).toBe(product1.id);
		expect(output.products[0].name).toBe(product1.name);
		expect(output.products[0].price).toBe(product1.price);

		expect(output.products[1].id).toBe(product2.id);
		expect(output.products[1].name).toBe(product2.name);
		expect(output.products[1].price).toBe(product2.price);
	});

	it('should list products created entity', async () => {
		const productRepository = new ProductRepository();
		const product1 = new Product('123', 'Celular Moto G-20', 2000);
		const product2 = new Product('432', 'Notebook Aple', 7000);

		product1.changeName('Celular Moto G-20 Pro');
		product1.changePrice(2100);

		product2.changeName('Notebook Aple M3 Pro');
		product2.changePrice(7200);

		await productRepository.create(product1);
		await productRepository.create(product2);

		const usecase = new ListProductsUseCase(productRepository);

		const output = await usecase.execute({});

		expect(output.products.length).toBe(2);

		expect(output.products[0].id).toBe(product1.id);
		expect(output.products[0].name).toBe(product1.name);
		expect(output.products[0].price).toBe(product1.price);

		expect(output.products[1].id).toBe(product2.id);
		expect(output.products[1].name).toBe(product2.name);
		expect(output.products[1].price).toBe(product2.price);
	});
});

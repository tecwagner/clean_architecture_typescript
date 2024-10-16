import {Sequelize} from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/sequelize/product/model/product.model';
import ProductRepository from '../../../infrastructure/sequelize/product/repository/product.repository';
import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Integration test for product update use case', () => {
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
	it('should update a product', async () => {
		const productRepository = new ProductRepository();
		const product = ProductFactory.create('Camisa polo', 69.9);

		await productRepository.create(product);

		const input = {
			id: product.id,
			name: 'Camisa polo manga longa - P',
			price: 77.99,
		};

		const usecase = new UpdateProductUseCase(productRepository);

		const output = await usecase.execute(input);

		expect(output).toEqual(input);
	});
});

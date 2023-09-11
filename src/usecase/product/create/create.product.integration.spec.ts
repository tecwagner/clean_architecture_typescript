import {Sequelize} from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/sequelize/product/repository/product.repository';
import CreateProductUseCase from './create.product.usecase';
import ProductModel from '../../../infrastructure/sequelize/product/model/product.model';

describe('Integration Test create product use case', () => {
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
	it('should create a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('123', 'Notebook ACER', 4000);

		await productRepository.create(product);

		const usecase = new CreateProductUseCase(productRepository);

		const input = {
			id: product.id,
			name: product.name,
			price: product.price,
		};

		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: output.id,
			name: output.name,
			price: output.price,
		});
	});
});

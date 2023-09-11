import { Sequelize } from 'sequelize-typescript';
import FindProductUseCase from './find.product.usecase';
import ProductModel from '../../../infrastructure/sequelize/product/model/product.model';
import ProductRepository from '../../../infrastructure/sequelize/product/repository/product.repository';
import Product from '../../../domain/product/entity/product';


describe('Integration Test find product use case', () => {

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

	it('should find a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('123', 'Notebook ACER', 4000)

		await productRepository.create(product);

		const usecase = new FindProductUseCase(productRepository);

		const input = {
			id: product.id,
		};

		const output = {
			id: product.id,
			name: product.name,
			price: product.price,
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});

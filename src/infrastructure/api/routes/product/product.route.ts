import express, {Request, Response} from 'express';
import CreateProductUseCase from '../../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../../sequelize/product/repository/product.repository';
import ListProductsUseCase from '../../../../usecase/product/list/list.product.usecase';
import FindProductUseCase from '../../../../usecase/product/find/find.product.usecase';
import UpdateProductUseCase from '../../../../usecase/product/update/update.product.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
	const usecase = new CreateProductUseCase(new ProductRepository());

	try {
		const productDto = {
			name: req.body.name,
			price: req.body.price,
		};

		const output = await usecase.execute(productDto);

		res.status(201).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

productRoute.get('/', async (req: Request, res: Response) => {
	const usecase = new ListProductsUseCase(new ProductRepository());

	try {
		const output = await usecase.execute({});

		res.status(200).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

productRoute.get('/:id', async (req: Request, res: Response) => {
	const usecase = new FindProductUseCase(new ProductRepository());

	try {
		const productDto = {
			id: req.params.id,
		};
		const output = await usecase.execute(productDto);

		res.status(200).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

productRoute.put('/', async (req: Request, res: Response) => {
	const usecase = new UpdateProductUseCase(new ProductRepository());

	try {
		const productDto = {
			id: req.body.id,
			name: req.body.name,
			price: req.body.price,
		};
		const output = await usecase.execute(productDto);
		
		res.status(201).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

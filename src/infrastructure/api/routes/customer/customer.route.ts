import express, {Request, Response} from 'express';
import CreateCustomerUsecase from '../../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../../sequelize/customer/repository/customer.repository';
import ListCustomersUseCase from '../../../../usecase/customer/list/list.customer.usecase';
import FindCustomerUsecase from '../../../../usecase/customer/find/find.customer.usecase';
import UpdateCustomerUseCase from '../../../../usecase/customer/update/update.customer.usecase';
import CustomerPresenter from '../../presenters/customer-presenter/customer.presenter';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
	const usecase = new CreateCustomerUsecase(new CustomerRepository());

	try {
		const customerDto = {
			name: req.body.name,
			address: {
				street: req.body.address.street,
				number: req.body.address.number,
				zip: req.body.address.zip,
				city: req.body.address.city,
			},
		};

		const output = await usecase.execute(customerDto);

		res.status(201).send(output);
	} catch (error) {
		res.status(500).send({ error: 'Something went wrong!' });
	}
});

customerRoute.get('/', async (req: Request, res: Response) => {
	const usecase = new ListCustomersUseCase(new CustomerRepository());

	try {
		const output = await usecase.execute({});

		// O retorno do DTO <> Resultado API
		// Tudo é JSON. E se for preciso retorna um resultado em XML?
		// Kafka
		// res.status(200).send(output);
		res.format({
			json: async () => res.status(200).send(output),
			xml: async () => res.status(200).send(CustomerPresenter.toXML(output)),
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

customerRoute.get('/:id', async (req: Request, res: Response) => {
	const usercase = new FindCustomerUsecase(new CustomerRepository());

	try {
		const customerDto = {
			id: req.params.id,
		};

		const output = await usercase.execute(customerDto);

		res.status(200).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

customerRoute.put('/', async (req: Request, res: Response) => {
	const usercase = new UpdateCustomerUseCase(new CustomerRepository());

	try {
		const customerDto = {
			id: req.body.id,
			name: req.body.name,
			address: {
				street: req.body.address.street,
				number: req.body.address.number,
				zip: req.body.address.zip,
				city: req.body.address.city,
			},
		};

		const output = await usercase.execute(customerDto);

		res.status(201).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

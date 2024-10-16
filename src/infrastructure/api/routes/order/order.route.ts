import express, {Request, Response} from 'express';
import CreateOrderUseCase from '../../../../usecase/order/create/create.order.usecase';
import OrderRepository from '../../../sequelize/order/repository/order.repository';
import ListOrdersUseCase from '../../../../usecase/order/list/list.order.usecase';
import FindOrderUseCase from '../../../../usecase/order/find/find.order.usecase';

export const orderRoute = express.Router();

orderRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateOrderUseCase(new OrderRepository());

    try {
        const orderDto = {
            id: req.body.id,
            customerId: req.body.customerId,
            items: req.body.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId
            }))
        };
        const output = await usecase.execute(orderDto);

        res.status(201).send(output);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message); 
            res.status(500).send({ error: 'Internal Server Error', details: err.message });
        } else {
            console.error('Erro desconhecido', err);
            res.status(500).send({ error: 'Internal Server Error', details: 'Unknown error occurred' });
        }
    }
})

orderRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListOrdersUseCase(new OrderRepository())

    try {
        const output = await usecase.execute({});

        res.status(200).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
})

orderRoute.get('/:id', async (req: Request, res: Response) => {
    const usecase = new FindOrderUseCase(new OrderRepository())

    try {
        const orderDto = {
            id: req.params.id,
        };
        const output = await usecase.execute(orderDto);

        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
})

orderRoute.put('/', async (req: Request, res: Response) => {
    const usecase = new CreateOrderUseCase(new OrderRepository())

    try {
        const orderDto = {
            id: req.body.id,
            customerId: req.body.customerId,
            items: req.body.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId
            }))
        };
        const output = await usecase.execute(orderDto);

        res.status(200).send(output);
        
    } catch (error) {
        res.status(500).send(error);
        
    }
})

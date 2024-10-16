import express, {Express} from 'express';
import {Sequelize} from 'sequelize-typescript';
import CustomerModel from '../sequelize/customer/model/customer.model';
import {customerRoute} from './routes/customer/customer.route';
import ProductModel from '../sequelize/product/model/product.model';
import {productRoute} from './routes/product/product.route';
import { orderRoute } from './routes/order/order.route';
import OrderModel from '../sequelize/order/model/order.model';
import OrderItemModel from '../sequelize/order/model/order-Item.model';

export const app: Express = express();
app.use(express.json());
app.use('/customer', customerRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
export let sequelize: Sequelize;

async function setupDb() {
	// banco sqlite em memoria
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: ':memory:',
		logging: false,
	});

	sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
	await sequelize.sync();
}

setupDb();

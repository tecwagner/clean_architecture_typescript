import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

import OrderModel from './order.model';
import ProductModel from '../../product/model/product.model';

@Table({
	tableName: 'orderItems',
	timestamps: false,
})
export default class OrderItemModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	// Relacionando o orders por id
	@ForeignKey(() => OrderModel)
	@Column({allowNull: false})
	declare order_Id: string;

	// Relacionando o orders ao produto
	@BelongsTo(() => OrderModel)
	declare order: ProductModel;

	// Relacionando o produtos pelo id
	@ForeignKey(() => ProductModel)
	@Column({allowNull: false})
	declare product_Id: string;

	// Relacionando o produtos pelo product - Forma de recuperar os dados product
	@BelongsTo(() => ProductModel)
	declare product: ProductModel;

	@Column({allowNull: false})
	declare name: string;

	@Column({allowNull: false})
	declare quantity: number;

	@Column({allowNull: false})
	declare price: number;
}

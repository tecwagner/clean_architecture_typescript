import {
	BelongsTo,
	Column,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import CustomerModel from '../../customer/model/customer.model';
import OrderItemModel from './order-Item.model';

@Table({
	tableName: 'orders',
	timestamps: false,
})
export default class OrderModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	//Relacionando por id do cliente
	@ForeignKey(() => CustomerModel)
	@Column({allowNull: false})
	declare customer_Id: string;

	// Relacionando por pelo cliente
	@BelongsTo(() => CustomerModel)
	declare customer: CustomerModel;

	// Relacionando a ordem ao item, uma order deve ter varios itens
	@HasMany(() => OrderItemModel)
	declare items: OrderItemModel[];

	@Column({allowNull: false})
	declare total: number;
}

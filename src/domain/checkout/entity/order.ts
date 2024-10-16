import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import OrderInterface from './order.interface';
import OrderItem from './order_Item';

export default class Order extends Entity implements OrderInterface {
	private _customerId: string;
	private _items: OrderItem[] = [];

	constructor(id: string, customerId: string, items: OrderItem[]) {
		super();
		this._id = id;
		this._customerId = customerId;
		this._items = items;
		
		this.validate();

		if (this.notification.hasErrors()) {
			throw new NotificationError(this.notification.errors());
		}
	}

	get id(): string {
		return this._id;
	}

	get customerId(): string {
		return this._customerId;
	}

	get items(): OrderItem[] {
		return this._items;
	}



	validate(): boolean {
		if (this._id.length === 0) {
			this.notification.addError({
				context: 'order',
				message: 'Id is required',
			});
		}
		if (this._customerId.length === 0) {
			this.notification.addError({
				context: 'order',
				message: 'Customer Id is required',
			});
		}
		if (this._items.length === 0) {
			this.notification.addError({
				context: 'order',
				message: 'Item qtd must be greater than 0',
			});
		}
		if (this._items.some((item) => item.quantity <= 0)) {
			this.notification.addError({
				context: 'order',
				message: 'Quantity must be greater than 0',
			});
		}

		return true;
	}

	// metodo que calcula o valor total da ordem por quantidade de item
	total(): number {
		return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
	}

	addItem(item: OrderItem): void {
        this._items.push(item);
    }

    removeItem(itemId: string): void {
        this._items = this._items.filter(item => item.id !== itemId);
    }
}

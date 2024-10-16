import OrderItem from './order_Item';

export default interface OrderInterface {
	get id(): string;
	get customerId(): string;
	get items(): OrderItem[];
	total(): number;
}

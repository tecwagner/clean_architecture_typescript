export interface InputListOrderDto {}

type Order = {
	id: string;
	customerId: string;
	total?: number;
	items: {
		id: string;
		productId: string;
		name: string;
		quantity: number;
		price: number;
	}[];
};

export interface OutputListOrderDto {
	orders: Order[];
}

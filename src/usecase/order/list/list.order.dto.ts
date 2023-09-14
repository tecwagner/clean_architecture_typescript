export interface InputListOrderDto {}

type Order = {
	id: string;
	customer_Id: string;
	items: {
		id: string;
		product_Id: string;
		name: string;
		quantity: number;
		price: number;
	}[];
};

export interface OutputListOrderDto {
	orders: Order[];
}

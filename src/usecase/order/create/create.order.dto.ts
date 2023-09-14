export interface InputCreateOrderDto {
	id: string;
	customer_Id: string;
	items: {
		id: string;
		product_Id: string;
		name: string;
		quantity: number;
		price: number;
	}[];
}
export interface OutputCreateOrderDto {
	id: string;
	customer_Id: string;
	total: number;
	items: {
		id: string;
		productId: string;
		name: string;
		quantity: number;
		price: number;
	}[];
}

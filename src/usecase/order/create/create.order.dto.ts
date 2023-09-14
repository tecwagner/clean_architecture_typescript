export interface InputCreateOrderDto {
	id: string;
	customerId: string;
	items: {
		id: string;
		productId: string;
		name: string;
		quantity: number;
		price: number;
	}[];
}
export interface OutputCreateOrderDto {
	id: string;
	customerId: string;
	total: number;
	items: {
		id: string;
		productId: string;
		name: string;
		quantity: number;
		price: number;
	}[];
}

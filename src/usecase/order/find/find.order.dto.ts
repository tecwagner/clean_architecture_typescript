export interface InputFindOrderDto {
	id: string;
}
export interface OutputFindOrderDto {
	id: string;
	customer_Id: string;
	total: number;
	items: {
		id: string;
		product_Id: string;
		name: string;
		quantity: number;
		price: number;
	}[];
	
}

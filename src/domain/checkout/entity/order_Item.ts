export default class OrderItem {
	private _id: string;
	private _name: string;
	private _productId: string;
	private _quantity: number;
	private _price: number;

	constructor(
		id: string,
		productId: string,
		name: string,
		quantity: number,
		price: number
	) {
		this._id = id;
		this._productId = productId;
		this._name = name;
		this._quantity = quantity;
		this._price = price;
		this.orderItemTotal();
	}

	get id(): string {
		return this._id;
	}

	get productId(): string {
		return this._productId;
	}

	get name(): string {
		return this._name;
	}

	get quantity(): number {
		return this._quantity;
	}

	get price(): number {
		return this._price;
	}

	changePrice(price: number): void {
		this._price = price;
		this.orderItemTotal();
	}

	changeToAddQuantity(quantity: number): void {
		this._quantity += quantity;
		this.orderItemTotal();
	}

	changeToDecreaseQuantity(quantity: number): void {
		this._quantity -= quantity;
		this.orderItemTotal();
	}

	orderItemTotal(): number {
		return this._price * this._quantity;
	}
}

import Address from './domain/customer/value-object/address';
import Customer from './domain/customer/entity/customer';
import OrderItem from './domain/checkout/entity/order_Item';
import Order from './domain/checkout/entity/order';

//Relação de agregados por ID
let customer = new Customer('123', 'Wagner Oliveira');
const address = new Address(
	'Rua Onofre Rimundo Braga',
	2730,
	'14408050',
	'Franca-SP'
);
customer.Address = address;
customer.activate();

//Relação de agregados por Objeto - Entidade
const item1 = new OrderItem('1', 'p1', 'camiseta', 2, 60);
const item2 = new OrderItem('2', 'p2', 'calça', 2, 150);
const order = new Order('1', '123', [item1, item2]);

console.log(customer);
console.log(order);

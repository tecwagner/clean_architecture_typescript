import ValidatorInterface from '../../@shared/validator/validator.interface';

import * as yup from 'yup';
import Product from '../entity/product';

export default class ProductYupValidator
	implements ValidatorInterface<Product>
{
	validate(entity: Product): void {
		try {
			yup
				.object()
				.shape({
					id: yup.string().required('Id is required'),
					name: yup.string().required('Name is required'),

					price: yup
						.number()
						.min(0, 'Price must be greate than zero')
						.required('Price is required'),
				})
				.validateSync(
					{
						id: entity.id,
						name: entity.name,
						price: entity.price,
					},
					{
						// O abortEarly retorna todos os erros de uma vez, depois que finalizar a verificação da entidade
						abortEarly: false,
					}
				);
		} catch (errors) {
			const e = errors as yup.ValidationError;
			// A cada erro que for verificado retorna os dados de errors, adicionando ao notificacion
			e.errors.forEach((error) => {
				entity.notification.addError({
					context: 'product',
					message: error,
				});
			});
		}
	}
}

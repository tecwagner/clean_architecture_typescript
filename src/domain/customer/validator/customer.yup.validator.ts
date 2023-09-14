import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';
import * as yup from 'yup';

export default class CustomerYupValidator
	implements ValidatorInterface<Customer>
{
	validate(entity: Customer): void {
		try {
			yup
				.object()
				.shape({
					id: yup.string().required('Id is required'),
					name: yup.string().required('Name is required'),
				})
				.validateSync(
					{
						id: entity.id,
						name: entity.name,
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
					context: 'customer',
					message: error,
				});
			});
		}
	}
}

import { currencyFormatter } from '@/libs/utils';
import { useStore } from '@/zustand/store';
import { useState } from 'react';

const StepThree = () => {
	const { formData, selectedServices, services, selectedDate, selectedTime } =
		useStore(state => state);
	const { updateFormData: setFormData } = useStore(state => state);
	const [errors, setErrors] = useState<Record<string, string | null>>({});

	const validate =
		(rule: (value: string) => boolean, message: string) =>
		(value: string) => (rule(value) ? null : message);

	const isRequired = (fieldName: string) =>
		validate(v => v.trim() !== '', `${fieldName} es requerido`);

	const isEmail = validate(
		v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
		'Correo inválido',
	);

	const validateDocument = validate(
		v => /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(v),
		'Formato de documento inválido',
	);
	const validators: Record<string, ((value: string) => string | null)[]> = {
		nombre: [isRequired('Nombre')],
		apellido: [isRequired('Apellido')],
		correo: [isRequired('Correo'), isEmail],
		telefono: [isRequired('Teléfono')],
		document: [isRequired('Documento'), validateDocument],
	};

	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	const getSelectedServiceName = () => {
		const service = services.find(s => s.id === selectedServices);
		return service ? service.name : '';
	};

	const getSelectedServicePrice = () => {
		const service = services.find(s => s.id === selectedServices);
		return service ? currencyFormatter(service.price) : 0;
	};

	// const handleInputChange = (e: {
	// 	target: { name: string; value: string };
	// }) => {
	// 	const { name, value } = e.target;
	// 	setFormData({
	// 		...formData,
	// 		[name]: value,
	// 	});
	// };

	const handleInputChange = (e: {
		target: { name: string; value: string };
	}) => {
		const { name, value } = e.target;

		// Validar si hay reglas para ese campo
		const fieldValidators = validators[name];
		let error = null;

		if (fieldValidators) {
			for (const validateFn of fieldValidators) {
				const validationResult = validateFn(value);
				if (validationResult) {
					error = validationResult;
					break;
				}
			}
		}

		setErrors(prev => ({ ...prev, [name]: error }));

		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				<div>
					<label
						htmlFor='nombre'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Nombre
					</label>
					<input
						type='text'
						id='nombre'
						name='nombre'
						className='w-full p-3 border rounded-md'
						value={formData.nombre}
						onChange={handleInputChange}
						required
					/>
					{errors.nombre && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.nombre}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor='apellido'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Apellido
					</label>
					<input
						type='text'
						id='apellido'
						name='apellido'
						className='w-full p-3 border rounded-md'
						value={formData.apellido}
						onChange={handleInputChange}
						required
					/>
					{errors.apellido && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.apellido}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor='correo'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Documento
					</label>
					<input
						type='text'
						id='correo'
						name='document'
						className='w-full p-3 border rounded-md'
						value={formData.document}
						onChange={handleInputChange}
						required
					/>
					{errors.document && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.document}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor='telefono'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Teléfono
					</label>
					<input
						type='tel'
						id='telefono'
						name='telefono'
						className='w-full p-3 border rounded-md'
						value={formData.telefono}
						onChange={handleInputChange}
						required
					/>
					{errors.telefono && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.telefono}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor='correo'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Correo
					</label>
					<input
						type='text'
						id='correo'
						name='correo'
						className='w-full p-3 border rounded-md'
						value={formData.correo}
						onChange={handleInputChange}
						required
					/>
					{errors.correo && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.correo}
						</p>
					)}
				</div>
			</div>

			<div className='mb-6'>
				<label
					htmlFor='notas'
					className='block text-sm font-medium text-gray-700 mb-1'>
					Notas Adicionales (opcional)
				</label>
				<textarea
					id='notas'
					name='notas'
					rows={4}
					className='w-full p-3 border rounded-md'
					placeholder='Cualquier información adicional que debamos saber'
					value={formData.notas}
					onChange={handleInputChange}></textarea>
			</div>

			{/* Reservation Summary */}
			<div className='bg-gray-100 p-4 rounded-md mt-6'>
				<h4 className='font-bold mb-3'>Resumen de la Reserva</h4>
				<div className='grid grid-cols-2 gap-2 text-sm'>
					<div className='text-gray-600'>Servicio:</div>
					<div className='text-right'>{getSelectedServiceName()}</div>

					<div className='text-gray-600'>Fecha:</div>
					<div className='text-right'>{formatDate(selectedDate)}</div>

					<div className='text-gray-600'>Hora:</div>
					<div className='text-right'>{selectedTime}</div>

					<div className='text-gray-600'>Precio:</div>
					<div className='text-right font-bold'>
						{getSelectedServicePrice()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepThree;


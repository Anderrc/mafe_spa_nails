import { currencyFormatter } from '@/libs/utils';
import { useStore } from '@/zustand/store';

const StepThree = () => {
	const { formData, selectedServices, services, selectedDate, selectedTime } =
		useStore(state => state);
	const { updateFormData: setFormData } = useStore(state => state);

	// Formato de fecha para mostrar
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

	const handleInputChange = (e: {
		target: { name: string; value: string };
	}) => {
		const { name, value } = e.target;
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


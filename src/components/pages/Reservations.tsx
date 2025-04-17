import { useStore } from '@/zustand/store';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ModalLoading } from '../ui/ModalLoading';
import Services from '../ui/Services';
import { ServicesSkeletonGrid } from '../ui/Services/skeleton';
import StepTwo from '../ui/StepTwo';
import StepThree from '../ui/StepThree';
import { StepFour } from '../ui/StepFour';

const Reservations = () => {
	const {
		selectedServices,
		formData,
		selectedDate,
		selectedTime,
		currentStep,
		setCurrentStep,
		setServices,
		services,
		isLoading,
		setIsLoading,
		updateSelectedServices,
		reset,
	} = useStore(state => state);

	const searchParams = useSearchParams();

	const search = searchParams.get('id');

	const goToNextStep = async () => {
		if (currentStep === 1 && selectedServices === undefined) {
			toast.error('Por favor selecciona al menos un servicio');
			return;
		}

		if (currentStep === 2 && (!selectedDate || !selectedTime)) {
			toast.error('Por favor selecciona fecha y hora');
			return;
		}

		if (currentStep === 3) {
			if (
				!formData.nombre ||
				!formData.apellido ||
				!formData.document ||
				!formData.telefono ||
				!formData.correo
			) {
				toast.error('Por favor completa todos los campos obligatorios');
				return;
			}

			// Aquí iría la lógica para enviar los datos al servidor
			setIsLoading(true);

			await fetch('/api/dates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: {
						name: formData.nombre,
						dir: formData.apellido,
						document: formData.document,
						tel: formData.telefono,
						email: formData.correo,
					},
					cita: {
						date: selectedDate,
						time: selectedTime,
						servicesId: selectedServices,
					},
				}),
			})
				.then(response => response.json())
				.then(data => {
					setIsLoading(false);
					if (data.code === 20001) {
						// Toast de error
						toast.error(
							'La hora seleccionada ya está reservada, selecciona otra hora',
							{
								position: 'bottom-right',
							},
						);
						return;
					}
					if (data.code === 20000) {
						// Toast de success
						toast.custom(
							t => (
								<div
									className={`${
										t.visible
											? 'animate-enter'
											: 'animate-leave'
									} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
									<div className='flex-1 w-0 p-4'>
										<div className='flex items-start'>
											<div className='flex-shrink-0 pt-0.5'>
												<Image
													className='h-10 w-10 rounded-full'
													src='/assets/girl.png'
													alt=''
													width={40}
													height={40}
												/>
											</div>
											<div className='ml-3 flex-1'>
												<p className='text-sm font-medium text-gray-900'>
													{formData.nombre} {formData.apellido}
												</p>
												<p className='mt-1 text-sm text-gray-500'>
													Nos vemos el {selectedDate}{' '}
													a las {selectedTime}
												</p>
											</div>
										</div>
									</div>
									<div className='flex border-l border-gray-200'>
										<button
											onClick={() => toast.dismiss(t.id)}
											className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
											Cerrar
										</button>
									</div>
								</div>
							),
							{
								position: 'bottom-right',
							},
						);
						setCurrentStep(4);

						return;
					}
					toast.error('error al enviar la reserva');
				})
				.catch(error => {
					console.error('💩 ~ error:', error);
					toast.error('error al enviar la reserva');
				});
			return;
		}

		setCurrentStep(currentStep + 1);
	};

	const goToPreviousStep = () => {
		setCurrentStep(currentStep - 1);
	};
	const getServices = useCallback(async () => {
		const response = await fetch('/api/services', { method: 'GET' });
		const data = await response.json();
		setServices(data.data);
		setIsLoading(false);
	}, [setServices, setIsLoading]);

	useEffect(() => {
		setIsLoading(true);
		getServices();
	}, [getServices, setIsLoading]);

	useEffect(() => {
		if (search) {
			updateSelectedServices(Number(search));
			setCurrentStep(2);
		}
	}, [search, setCurrentStep, updateSelectedServices]);

	useEffect(() => {
		reset();
	}, [reset]);

	return (
		<div className='h-full max-w-4xl sm-w-full mx-auto p-6 bg-white'>
			{/* Header */}
			<ModalLoading isLoading={isLoading} />

			<div>
				<Toaster />
			</div>
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-bold mb-2'>Reserva tu Cita</h1>
				<p className='text-gray-600'>
					Selecciona el servicio, fecha y hora para tu experiencia de
					spa
				</p>
			</div>

			{/* Reservation Card */}
			<div className='min-h-dv border rounded-lg p-6 shadow-sm'>
				{/* Reservation Header */}
				<div className='flex justify-between items-center mb-6 border-b pb-4 flex-col flex-wrap md:flex-row'>
					<div className=' md:w-1/3 w-full mb-6'>
						<h2 className='text-md font-bold'>
							Detalles de la Reserva
						</h2>
						<p className='text-sm text-gray-600'>
							Completa todos los campos para confirmar tu reserva
						</p>
					</div>

					{/* Stepper */}
					<div className='flex items-center space-x-1 text-sm'>
						<div className='flex items-center flex-col space-y-1 md:flex-row'>
							<span
								className={`${
									currentStep === 1
										? 'bg-[#f1d5a2] text-white'
										: 'bg-gray-200 text-gray-600'
								} rounded-full w-6 h-6 flex items-center justify-center mr-1`}>
								1
							</span>
							<span
								className={`hidden md:block
									${currentStep === 1 ? 'text-black font-bold' : 'text-gray-600'}
									`}>
								Servicio
							</span>
						</div>
						<span className='text-gray-400'>——</span>
						<div className='flex items-center flex-col space-y-1 md:flex-row'>
							<span
								className={`${
									currentStep === 2
										? 'bg-[#f1d5a2] text-white'
										: 'bg-gray-200 text-gray-600'
								} rounded-full w-6 h-6 flex items-center justify-center mr-1`}>
								2
							</span>
							<span
								className={`hidden md:block
									${currentStep === 2 ? 'text-black font-bold' : 'text-gray-600'}
									`}>
								Fecha y Hora
							</span>
						</div>
						<span className='text-gray-400'>——</span>
						<div className='flex items-center flex-col space-y-1 md:flex-row'>
							<span
								className={`${
									currentStep === 3
										? 'bg-[#f1d5a2] text-white'
										: 'bg-gray-200 text-gray-600'
								} rounded-full w-6 h-6 flex items-center justify-center mr-1`}>
								3
							</span>
							<span
								className={`hidden md:block
									${currentStep === 3 ? 'text-black font-bold' : 'text-gray-600'}
									`}>
								Información
							</span>
						</div>
						<span className='text-gray-400'>——</span>
						<div className='flex items-center flex-col space-y-1 md:flex-row'>
							<span
								className={`${
									currentStep === 4
										? 'bg-[#f1d5a2] text-white'
										: 'bg-gray-200 text-gray-600'
								} rounded-full w-6 h-6 flex items-center justify-center mr-1`}>
								3
							</span>
							<span
								className={`hidden md:block
									${currentStep === 4 ? 'text-black font-bold' : 'text-gray-600'}
									`}>
								Confirmación
							</span>
						</div>
					</div>
				</div>

				{/* Step 1: Service Selection */}
				{currentStep === 1 && (
					<div className='min-h-[300px]'>
						<h3 className='text-lg font-bold mb-4'>
							Selecciona uno o varios servicios
						</h3>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
							{services.map(service => (
								<Services key={service.id} service={service} />
							))}
						</div>
						{isLoading && <ServicesSkeletonGrid count={3} />}
					</div>
				)}

				{/* Step 2: Date and Time Selection */}
				{currentStep === 2 && <StepTwo></StepTwo>}

				{/* Step 3: Personal Information */}
				{currentStep === 3 && <StepThree></StepThree>}

				{/* Step 4: Confirmation */}
				{currentStep === 4 && <StepFour></StepFour>}

				{/* Navigation Buttons */}
				<div className='flex justify-between mt-8'>
					{currentStep < 4 && (
						<>
							<button
								className='text-center font-bold bg-[#fbbcb6] text-white py-1 px-3 rounded-md hover:bg-gray-800 transition-colors md:py-3 md:px-6 text-sm'
								onClick={
									currentStep > 1
										? goToPreviousStep
										: () => {}
								}>
								{currentStep > 1 ? 'Anterior' : 'Cancelar'}
							</button>{' '}
							<button
								className='text-center font-bold bg-[#90ccf4] text-white py-1 px-3 rounded-md hover:bg-gray-800 transition-colors md:py-3 md:px-6 text-sm'
								onClick={goToNextStep}>
								{currentStep === 3
									? 'Confirmar Reserva'
									: 'Siguiente'}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Reservations;


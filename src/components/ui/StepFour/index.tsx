import Image from 'next/image';

export const StepFour = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-96'>
			<h1 className='text-3xl font-bold mb-2'>Reserva Confirmada</h1>
			<p className='text-gray-600'>
				Gracias por reservar tu Cita, te enviaremos un correo con los
				detalles de la cita.
			</p>

			<div className='flex flex-col items-center justify-center'>
				<Image
					alt='Spa Treatment'
					className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
					height='550'
					src='/assets/manicure.jpg'
					width='400'
				/>
			</div>

			<a
				className='mt-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors'
				href={'/'}>
				Volver a Inicio
			</a>
		</div>
	);
};


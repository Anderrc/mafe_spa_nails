import { currencyFormatter } from '@/libs/utils';
import { useStore } from '@/zustand/store';
import Image from 'next/image';

const Services = ({
	service,
}: {
	service: {
		id: number;
		name: string;
		description: string;
		price: number;
		duration: string;
	};
}) => {
	const { selectedServices } = useStore(state => state);
	const { updateSelectedServices: setSelectedServices } = useStore(
		state => state,
	);

	const toggleService = (serviceId: number | undefined) => {
		if (selectedServices === serviceId) {
			setSelectedServices(undefined);
		} else {
			setSelectedServices(serviceId);
		}
	};

	return (
		<div
			key={service.id}
			className={`border bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
				selectedServices === service.id ? 'ring-2 ring-blue-500' : ''
			}`}
			onClick={() => toggleService(service.id)}>
			<div className='bg-gray-200 h-48 flex items-center justify-center relative'>
				<Image
					alt='Masaje Relajante'
					className='object-cover w-full h-48'
					src={`/assets/${service.id}.jpg`}
					width={253}
					height={128}
				/>
				{selectedServices === service.id && (
					<div className='absolute top-2 right-2 bg-blue-500 rounded-full p-1'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4 text-white'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
					</div>
				)}
			</div>
			<div className='p-4'>
				<h4 className='font-bold mb-1'>{service.name}</h4>
				<p className='text-sm text-gray-600 mb-3'>
					{service.description}
				</p>
				<div className='flex justify-between items-center'>
					<span className='font-bold'>
						{currencyFormatter(service.price)}
					</span>
					<span className='text-gray-600 text-sm'>
						{service.duration} minutos
					</span>
				</div>
			</div>
		</div>
	);
};

export default Services;


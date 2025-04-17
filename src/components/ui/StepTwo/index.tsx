import { useStore } from '@/zustand/store';
import { useCallback, useEffect, useState } from 'react';
import StepTwoSkeleton from './skeleton';

const StepTwo = () => {
	const { selectedDate, selectedTime, setDates, dates } = useStore(
		state => state,
	);
	const [isLoading, setIsLoading] = useState(false);
	const {
		updateSelectedDate: setSelectedDate,
		updateSelectedTime: setSelectedTime,
	} = useStore(state => state);

	const timeSlots = [
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
	];

	const getDates = useCallback(async () => {
		setIsLoading(true);
		const response = await fetch('/api/dates?date=' + selectedDate);
		const data = await response.json();
		setDates(data.data);
		setIsLoading(false);
	}, [selectedDate, setDates]);

	const getLastDayOfMonth = () => {
		const date = new Date();
		date.setMonth(date.getMonth() + 1);
		date.setDate(0);
		return date.toISOString().split('T')[0];
	};

	useEffect(() => {
		if (selectedDate) {
			getDates();
		}
		if (!selectedDate) {
			setSelectedDate(new Date().toISOString().split('T')[0]);
		}
	}, [selectedDate, getDates, setSelectedDate]);

	if (isLoading) return <StepTwoSkeleton></StepTwoSkeleton>;

	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				{/* Date Selection */}
				<div>
					<h3 className='text-lg font-bold mb-4'>
						Selecciona una Fecha
					</h3>
					<div className='relative'>
						<input
							type='date'
							className='w-full p-3 border rounded-md'
							placeholder='Selecciona una fecha'
							value={selectedDate}
							min={new Date().toISOString().split('T')[0]}
							max={getLastDayOfMonth()}
							onChange={e => {
								setSelectedDate(e.target.value);
							}}
						/>
					</div>
				</div>

				{/* Time Selection */}
				<div>
					<h3 className='text-lg font-bold mb-4'>
						Selecciona una Hora
					</h3>
					<div className='grid grid-cols-3 gap-2'>
						{timeSlots.map(time => (
							<button
								key={time}
								disabled={dates.includes(time)}
								className={`p-3 border rounded-md flex items-center justify-center disabled:bg-gray-300 ${
									selectedTime === time
										? 'bg-blue-500 text-white'
										: 'hover:bg-gray-100'
								}`}
								onClick={() => setSelectedTime(time)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 mr-1'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								{time}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Reservation Info */}
			<div className='bg-gray-100 p-4 rounded-md mt-6'>
				<div className='flex items-start'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 text-gray-500 mr-2 mt-0.5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<div>
						<h4 className='font-medium'>
							Información de la Reserva
						</h4>
						<p className='text-sm text-gray-600'>
							Por favor selecciona un servicio, fecha y hora para
							continuar.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepTwo;


const ServicesSkeleton = () => {
	return (
		<div className='border rounded-lg overflow-hidden hover:shadow-md transition-shadow'>
			{/* Image placeholder */}
			<div className='bg-gray-200 h-48 animate-pulse' />

			<div className='p-4'>
				{/* Title placeholder */}
				<div className='h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse' />

				{/* Description placeholder */}
				<div className='space-y-2 mb-3'>
					<div className='h-3 bg-gray-200 rounded w-full animate-pulse' />
					<div className='h-3 bg-gray-200 rounded w-5/6 animate-pulse' />
					<div className='h-3 bg-gray-200 rounded w-4/6 animate-pulse' />
				</div>

				{/* Price and duration placeholder */}
				<div className='flex justify-between items-center'>
					<div className='h-4 bg-gray-300 rounded w-1/4 animate-pulse' />
					<div className='h-3 bg-gray-200 rounded w-1/3 animate-pulse' />
				</div>
			</div>
		</div>
	);
};

// You can use this to render multiple skeletons
export const ServicesSkeletonGrid = ({ count = 3 }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{Array(count)
				.fill(0)
				.map((_, index) => (
					<ServicesSkeleton key={index} />
				))}
		</div>
	);
};

export default ServicesSkeleton;


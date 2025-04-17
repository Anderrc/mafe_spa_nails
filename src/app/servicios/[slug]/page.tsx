import { currencyFormatter } from '@/libs/utils';
import { ServicesState } from '@/models/useStore';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
	const response = await fetch(
		process.env.NEXT_PUBLIC_URL + '/api/services',
		{
			method: 'GET',
		},
	);
	const data = await response.json();
	return data.data.map((service: ServicesState) => ({
		params: { slug: service.id.toString() },
	}));
}

const getProduct = async ({ params }: ServicePageParams) => {
	const sl = await params;

	const response = await fetch(
		process.env.NEXT_PUBLIC_URL + '/api/services',
		{
			method: 'POST',
			body: JSON.stringify({
				id: Number(sl.slug),
			}),
		},
	);
	const data = (await response.json()) as { data: ServicesState };
	return data.data;
};

interface ServicePageParams {
	params: {
		slug: string;
	};
}

export default async function ServicePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const service = await getProduct({ params: await params });

	if (!service) return <div>Servicio no encontrado</div>;

	return (
		<section className='w-full py-12 md:py-24 lg:py-32 bg-white'>
			<div className='container px-4 md:px-6  max-w-6xl mx-auto'>
				<div className='grid md:grid-cols-2 gap-8 mb-6'>
					<div className='relative aspect-square bg-gray-200 rounded-lg'>
						<Image
							src={`/assets/${service.id}.jpg`}
							alt={service.name}
							width={536}
							height={536}
							className='object-cover w-full h-full rounded-lg'
						/>
					</div>
					<div className='flex flex-col justify-center'>
						<h1 className='text-3xl font-bold mb-2'>
							{service.name}
						</h1>
						{service.price && (
							<p className='text-xl font-semibold mb-4'>
								{currencyFormatter(service.price)}
							</p>
						)}
						<div className='mb-6'>
							<h2 className='text-lg font-semibold mb-2'>
								Description
							</h2>
							<p className='text-gray-700'>
								{service.description}
							</p>
						</div>
						<Link
							href={`/reservar?id=${service.id}`}
							className='text-center font-bold bg-[#90ccf4] text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors'>
							Separa tu cita
						</Link>
					</div>
				</div>
				<div className='flex justify-center mt-8'>
					<Link href='/servicios'>
						<button
							type='button'
							className='rounded-md font-bold  text-base bg-[#90ccf4] text-white py-3 px-6 hover:bg-gray-800 transition-colors'>
							Ver Todos los Servicios
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}


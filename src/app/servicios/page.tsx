import { ServicesState } from '@/models/useStore';
import Image from 'next/image';
import Link from 'next/link';

const getProducts = async () => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_URL + '/api/services',
		{
			method: 'GET',
		},
	);

  
	const data = await response.json();
	return data.data as ServicesState[];
};

export default async function Servicios() {
	const products = await getProducts();

	return (
		<div className='flex flex-col items-center justify-center space-y-4 text-center p-10'>
			<div className='space-y-2'>
				<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
					Nuestros Servicios
				</h2>
				<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
					Descubre nuestra amplia gama de tratamientos diseñados para
					relajar, rejuvenecer y revitalizar.
				</p>
			</div>
			<div className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl p-7'>
				{products.map(product => (
					<Link key={product.id} href={`/servicios/${product.id}`}>
						<div className='rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-xl hover:scale-3d hover:border-blue-500'>
							<div>
								<Image
									src={`/assets/${product.id}.jpg`}
									alt={product.name}
									width={253}
									height={128}
									className='object-cover w-full h-48'
								/>
								<div className='p-6'>
									<h3 className='text-xl font-bold'>
										{product.name}
									</h3>
									<p className='mt-2 text-sm text-muted-foreground'>
										{product.description}
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}


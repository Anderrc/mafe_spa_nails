'use client';
import { Button } from '@/components/ui/Atoms/button';
import { currencyFormatter } from '@/libs/utils';
import { useStore } from '@/zustand/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
	const { services, setServices } = useStore(state => state);

	useEffect(() => {
		const getServices = async () => {
			const response = await fetch('/api/services', { method: 'GET' });
			const data = await response.json();
			setServices(data.data);
		};
		getServices();
	}, [setServices]);

	return (
		<div className='flex flex-col h-full min-h-screen w-full justify-center align-center'>
			{/* Hero Section */}
			<section className='relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-rose-50 to-teal-50'>
				<div className='container px-4 md:px-6  max-w-6xl mx-auto'>
					<div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
						<div className='flex flex-col justify-center space-y-4'>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Descubre un oasis de tranquilidad y
									bienestar
								</h1>
								<p className='max-w-[600px] text-muted-foreground md:text-xl'>
									Reserva tu experiencia de spa y permítenos
									cuidar de ti.
								</p>
							</div>
							<div className='flex flex-col gap-2 min-[400px]:flex-row'>
								<Link href='/reservar'>
									<Button
										size='lg'
										className='text-center font-bold bg-[#90ccf4] text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors'>
										Reservar Cita
									</Button>
								</Link>
								<Link href='/servicios'>
									<Button className='text-center font-bold bg-[#90ccf4] text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors'>
										Ver Servicios
									</Button>
								</Link>
							</div>
						</div>
						<div className='flex items-center justify-center'>
							<Image
								alt='Spa Treatment'
								className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
								height='550'
								src='/assets/manicure.jpg'
								width='800'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Services */}
			<section className='w-full py-12 md:py-24 lg:py-32 bg-white'>
				<div className='container px-4 md:px-6  max-w-6xl mx-auto'>
					<div className='flex flex-col items-center justify-center space-y-4 text-center'>
						<div className='space-y-2'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								Nuestros Servicios
							</h2>
							<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
								Descubre nuestra amplia gama de tratamientos
								diseñados para relajar, rejuvenecer y
								revitalizar.
							</p>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3'>
						{services.map(service => (
							<div
								className='rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-lg'
								data-v0-t='card'
								key={service.id}>
								<Image
									alt='Masaje Relajante'
									className='object-cover w-full h-48'
									src={`/assets/${service.id}.jpg`}
									width={800}
									height={500}
								/>
								<div className='p-6'>
									<h3 className='text-xl font-bold'>
										{service.name}
									</h3>
									<p className='mt-2 text-muted-foreground'>
										{service.description}
									</p>
									<div className='flex items-center justify-between mt-4'>
										<span className='text-lg font-semibold'>
											{currencyFormatter(service.price)}
										</span>
										<a href='/reservar?service=1'>
											<button className='text-center font-bold bg-[#90ccf4] text-white py-2 px-5 rounded-md hover:bg-gray-800 transition-colors'>
												Reservar
											</button>
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='flex justify-center mt-8'>
						<Link href='/servicios'>
							<button
								type='button'
								className='text-center font-bold bg-[#90ccf4] text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors'>
								Ver Todos los Servicios
							</button>
						</Link>
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className='w-full py-12 md:py-24 lg:py-32 bg-muted/50'>
				<div className='container px-4 md:px-6  max-w-6xl mx-auto'>
					<div className='flex flex-col items-center justify-center space-y-4 text-center'>
						<div className='space-y-2'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								¿Por qué elegirnos?
							</h2>
							<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
								Nos dedicamos a proporcionar experiencias
								excepcionales de spa con atención personalizada.
							</p>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3'>
						<div className='flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm'>
							<div className='p-3 mb-4 rounded-full bg-primary/10'>
								{/* <CalendarDays className='w-6 h-6 text-primary' /> */}
							</div>
							<h3 className='text-xl font-bold'>
								Reservas Flexibles
							</h3>
							<p className='mt-2 text-muted-foreground'>
								Sistema de reservas fácil de usar con opciones
								flexibles para adaptarse a tu agenda.
							</p>
						</div>
						<div className='flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm'>
							<div className='p-3 mb-4 rounded-full bg-primary/10'>
								{/* <Clock className='w-6 h-6 text-primary' /> */}
							</div>
							<h3 className='text-xl font-bold'>
								Terapeutas Expertos
							</h3>
							<p className='mt-2 text-muted-foreground'>
								Nuestro equipo de profesionales certificados
								está dedicado a proporcionar el mejor servicio.
							</p>
						</div>
						<div className='flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm'>
							<div className='p-3 mb-4 rounded-full bg-primary/10'>
								{/* <MapPin className='w-6 h-6 text-primary' /> */}
							</div>
							<h3 className='text-xl font-bold'>
								Ambiente Relajante
							</h3>
							<p className='mt-2 text-muted-foreground'>
								Instalaciones diseñadas para crear una atmósfera
								de paz y tranquilidad.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}


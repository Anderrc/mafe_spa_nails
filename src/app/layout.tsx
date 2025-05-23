import { Button } from '@/components/ui/Atoms/button';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Link from 'next/dist/client/link';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Mafe Nails Spa',
	description: 'Reserva tu experiencia de spa y permítenos cuidar de ti.',
	openGraph: {
		type: 'website',
		url: process.env.NEXT_PUBLIC_URL,
		title: 'Mafe Nails Spa',
		description: 'Reserva tu experiencia de spa y permítenos cuidar de ti.',
		images: [`/assets/manicure.jpg`],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es-CO'>
			<Analytics />
			<head>
				<link rel='icon' href='/assets/nail-polish.png' />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-3xs`}>
				<div className='flex flex-col min-h-screen justify-center align-center min-w-24'>
					<header className='sticky top-0 z-10 bg-white border-b w-full min-w-24'>
						<div className='container flex items-center justify-between h-16 px-4 md:px-6 max-w-6xl mx-auto min-w-24'>
							<Link href='/' className='flex items-center gap-2'>
								<span className='text-sm md:text-lg text-center font-semibold flex items-center gap-2'>
									<Image
										src='/assets/nail-polish.png'
										alt={''}
										width={32}
										height={32}
										className='w-6 h-6 md:w-8 md:h-8'
									/>
									Mafe Nails Spa
								</span>
							</Link>
							<nav className='hidden gap-6 md:flex'>
								<Link
									href='/'
									className='font-medium transition-colors hover:text-primary'>
									Inicio
								</Link>
								<Link
									href='/servicios'
									className='font-medium transition-colors hover:text-primary'>
									Servicios
								</Link>
								<Link
									href='/reservar'
									className='font-medium transition-colors hover:text-primary'>
									Reservar
								</Link>
								{/* <Link
									href='/contacto'
									className='font-medium transition-colors hover:text-primary'>
									Contacto
								</Link> */}
							</nav>
							<div className='flex items-center gap-4'>
								<Link href='/reservar'>
									<Button className='text-center font-bold bg-[#09a6a3] text-white py-1 px-3 rounded-md hover:bg-gray-800 transition-colors md:py-3 md:px-6 text-sm'>
										Reservar Ahora
									</Button>
								</Link>
								{/* <Link
							href='/admin'
							className='text-sm text-muted-foreground hover:text-primary'>
							Acceso Staff
						</Link> */}
							</div>
						</div>
					</header>
					{children}
					{/* Footer */}
					<footer className='w-full py-6 bg-gray-100'>
						<div className='container px-4 md:px-6  max-w-6xl mx-auto'>
							<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
								<div>
									<h3 className='text-lg font-semibold'>
										Mafe Nails Spa
									</h3>
									<p className='mt-2 text-sm text-muted-foreground'>
										Tu oasis de tranquilidad y bienestar en
										el corazón de la ciudad.
									</p>
								</div>
								<div>
									<h3 className='text-lg font-semibold'>
										Enlaces Rápidos
									</h3>
									<ul className='mt-2 space-y-2 text-sm'>
										<li>
											<Link
												href='/'
												className='text-muted-foreground hover:text-primary'>
												Inicio
											</Link>
										</li>
										<li>
											<Link
												href='/servicios'
												className='text-muted-foreground hover:text-primary'>
												Servicios
											</Link>
										</li>
										<li>
											<Link
												href='/reservar'
												className='text-muted-foreground hover:text-primary'>
												Reservar
											</Link>
										</li>
										{/* <li>
											<Link
												href='/contacto'
												className='text-muted-foreground hover:text-primary'>
												Contacto
											</Link>
										</li> */}
									</ul>
								</div>
								<div>
									<h3 className='text-lg font-semibold'>
										Contacto
									</h3>
									<ul className='mt-2 space-y-2 text-sm'>
										<li className='text-muted-foreground'>
											Calle Principal 123
										</li>
										<li className='text-muted-foreground'>
											Ciudad, CP 12345
										</li>
										<li className='text-muted-foreground'>
											info@serenityspa.com
										</li>
										<li className='text-muted-foreground'>
											+1 234 567 890
										</li>
									</ul>
								</div>
								<div>
									<h3 className='text-lg font-semibold'>
										Horario
									</h3>
									<ul className='mt-2 space-y-2 text-sm'>
										<li className='text-muted-foreground'>
											Lunes - Viernes: 9:00 - 20:00
										</li>
										<li className='text-muted-foreground'>
											Sábado: 10:00 - 18:00
										</li>
										<li className='text-muted-foreground'>
											Domingo: 10:00 - 16:00
										</li>
									</ul>
								</div>
							</div>
							<div className='flex flex-col items-center justify-between gap-4 mt-8 md:flex-row'>
								<p className='text-sm text-muted-foreground'>
									© 2024 Mafe Nails Spa. Todos los derechos
									reservados.
								</p>
								<div className='flex items-center gap-4'>
									<Link
										href='#'
										className='text-muted-foreground hover:text-primary'>
										Términos
									</Link>
									<Link
										href='#'
										className='text-muted-foreground hover:text-primary'>
										Privacidad
									</Link>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</body>
		</html>
	);
}


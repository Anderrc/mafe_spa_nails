import { prisma } from '@/libs/prisma';

export async function GET() {
	try {
		const services = await prisma.servicio.findMany();
		return Response.json({
			message: 'Services obtained successfully',
			data: services,
		});
	} catch (error) {
		console.error('💩 ~ error:', error);
		return Response.json({ message: 'Error obtaining services' });
	}
}

export async function POST(req: Request) {
	const { id } = await req.json();
	try {
		const services = await prisma.servicio.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		return Response.json({
			message: 'Services obtained successfully',
			data: services,
		});
	} catch (error) {
		console.error('💩 ~ error:', error);
		return Response.json({ message: 'Error obtaining services' });
	}
}


import { prisma } from '@/libs/prisma';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (!body.user) {
			return Response.json({ message: 'User not found', code: 10004 });
		}

		if (!body.cita) {
			return Response.json({ message: 'Cita not found', code: 20004 });
		}

		const dates = await prisma.cita.findMany({
			where: {
				date: new Date(body.cita.date),
				time: body.cita.time,
			},
		});

		if (dates.length > 0) {
			return Response.json({
				message: 'Date already exists',
				code: 20001,
			});
		}

		let user = await prisma.user.findUnique({
			where: {
				document: body.user.document,
			},
		});

		if (!user) {
			user = await prisma.user.create({
				data: { ...body.user, typeId: 1 },
			});
		}

		await prisma.cita.create({
			data: {
				clientId: user?.id,
				statusId: 1,
				date: new Date(body.cita.date),
				time: body.cita.time,
				servicesId: body.cita.servicesId,
			},
		});

		const servcio = await prisma.servicio.findUnique({
			where: {
				id: body.cita.servicesId,
			},
		});

		const resend = new Resend('re_dS2fqtYk_HcMyjipJXQwAMhKzwTq5dvD5');

		const html = `
			<!DOCTYPE html>
				<html lang="en">
				<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Reservation Confirmation</title>
						<style>
								body {
										font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
										line-height: 1.6;
										color: #333;
										background-color: #f5f5f5;
										margin: 0;
										padding: 0;
								}
								.container {
										max-width: 600px;
										margin: 0 auto;
										background: white;
										border-radius: 8px;
										overflow: hidden;
										box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
								}
								.header {
										background: #4C1D95;
										color: white;
										padding: 20px;
										text-align: center;
								}
								.content {
										padding: 30px;
								}
								.reservation-details {
										background: #f9f9f9;
										border-radius: 8px;
										padding: 20px;
										margin-bottom: 20px;
								}
								.detail-row {
										display: flex;
										justify-content: space-between;
										margin-bottom: 10px;
										border-bottom: 1px solid #eee;
										padding-bottom: 10px;
								}
								.detail-row:last-child {
										border-bottom: none;
										margin-bottom: 0;
										padding-bottom: 0;
								}
								.detail-label {
										font-weight: bold;
										color: #666;
								}
								.confirmation-number {
										font-size: 24px;
										text-align: center;
										margin: 20px 0;
										color: #4C1D95;
										font-weight: bold;
								}
								.footer {
										background: #f0f0f0;
										padding: 20px;
										text-align: center;
										font-size: 14px;
										color: #666;
								}
								.button {
										display: inline-block;
										background: #4C1D95;
										color: white;
										padding: 12px 24px;
										text-decoration: none;
										border-radius: 4px;
										font-weight: bold;
										margin-top: 20px;
								}
								.button:hover {
										background: #6D28D9;
								}
								.policies {
										border-top: 1px solid #eee;
										margin-top: 30px;
										padding-top: 20px;
										font-size: 14px;
								}
								.logo {
										max-width: 150px;
										margin-bottom: 10px;
								}
								@media (max-width: 600px) {
										.container {
												width: 100%;
												border-radius: 0;
										}
										.content {
												padding: 20px;
										}
								}
						</style>
				</head>
				<body>
						<div class="container">
								<div class="header">
										<img src="/placeholder.svg?height=50&width=150" alt="Company Logo" class="logo">
										<h1>Reserva Confirmada!</h1>
								</div>
								
								<div class="content">
										<p>Querid@ <strong>${body.user.name}</strong>,</p>
										
										<p>Gracias por tu reserva. Estamos emocionados de confirmar tu reserva con nosotros!</p>
										
										<div class="confirmation-number">
												Confirmation #: RES${body.cita.id}
										</div>
										
										<div class="reservation-details">
												<h2>Reservation Details</h2>
												
												<div class="detail-row">
														<span class="detail-label">Date:</span>
														<span>${body.cita.date}</span>
												</div>
												
												<div class="detail-row">
														<span class="detail-label">Time:</span>
														<span>${body.cita.time}</span>
												</div>
												
												<div class="detail-row">
														<span class="detail-label">Servicio:</span>
														<span>${servcio?.name}</span>
												</div>
										</div>
										
										<div class="reservation-details">
												<h2>Información de Contacto</h2>
												
												<div class="detail-row">
														<span class="detail-label">Name:</span>
														<span>${body.user.name}</span>
												</div>
												
												<div class="detail-row">
														<span class="detail-label">Email:</span>
														<span>${body.user.email}</span>
												</div>
												
												<div class="detail-row">
														<span class="detail-label">Phone:</span>
														<span>${body.user.tel}</span>
												</div>
										</div>
										
										<div style="text-align: center;">
												<a href="#" class="button">Manage Reservation</a>
										</div>
										
										<div class="policies">
												<h3>Política de Cancelación</h3>
												<p>Solo puedes cancelar tu cita hasta 24 horas antes de tu horario de reserva sin ninguna penalización. Para cancelaciones hechas menos de 24 horas en anticipación, se aplicará una tarifa de cancelación.</p>
												
												<h3>Llegada tardía</h3>
												<p>Tendremos tu mesa en vigor por 15 minutos después de tu horario de reserva. Si te quedaste atrasado, por favor contactanos para que te mantengamos.</p>
										</div>
								</div>
								
								<div class="footer">
										<p><strong>Mafe Spa</strong><br>
										Carrera 67a #10-12<br>
										Phone: 300400400<br>
										Email: reservations@mafespa.com</p>
										
										<p>© 2025 Mafe Spa. todos los derechos reservados.</p>
								</div>
						</div>
				</body>
				</html>
		`;
		const response = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [body.user.email],
			subject: 'Confirma tu cita',
			html: html,
		});
		console.log('💩 ~ POST ~ response:', response);

		return Response.json({
			message: 'Date created successfully',
			code: 20000,
		});
	} catch (error) {
		console.error('💩 ~ error:', error);
		return Response.json({ message: 'Error creating user and cities' });
	}
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const date = searchParams.get('date');
	try {
		const dates = await prisma.cita.findMany({
			where: {
				date: new Date(date ?? ''),
			},
		});
		const datesString = dates.map(date => date.time);
		return Response.json({
			message: 'dates obtained successfully',
			data: datesString,
		});
	} catch (error) {
		console.error('💩 ~ error:', error);
		return Response.json({ message: 'error obtaining dates' });
	}
}


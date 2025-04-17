// 'use client';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Calendar as CalendarComponent } from '@/components/ui/calendar';
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from '@/components/ui/card';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// } from '@/components/ui/dialog';
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from '@/components/ui/popover';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { cn } from '@/lib/utils';
// import { format } from 'date-fns';
// import { es } from 'date-fns/locale';
// import { Calendar, Filter, Search, User, Users, X } from 'lucide-react';
// import { useState } from 'react';

// export default function AdminPage() {
// 	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
// 		new Date(),
// 	);
// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [statusFilter, setStatusFilter] = useState<string | undefined>(
// 		undefined,
// 	);
// 	const [serviceFilter, setServiceFilter] = useState<string | undefined>(
// 		undefined,
// 	);
// 	const [selectedAppointment, setSelectedAppointment] =
// 		useState<Appointment | null>(null);
// 	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

// 	// Filtrar citas según los criterios
// 	const filteredAppointments = appointments.filter(appointment => {
// 		// Filtro por fecha
// 		const dateMatch = selectedDate
// 			? appointment.date.toDateString() === selectedDate.toDateString()
// 			: true;

// 		// Filtro por búsqueda (nombre o email)
// 		const searchMatch = searchQuery
// 			? appointment.clientName
// 					.toLowerCase()
// 					.includes(searchQuery.toLowerCase()) ||
// 			  appointment.clientEmail
// 					.toLowerCase()
// 					.includes(searchQuery.toLowerCase())
// 			: true;

// 		// Filtro por estado
// 		const statusMatch = statusFilter
// 			? appointment.status === statusFilter
// 			: true;

// 		// Filtro por servicio
// 		const serviceMatch = serviceFilter
// 			? appointment.service === serviceFilter
// 			: true;

// 		return dateMatch && searchMatch && statusMatch && serviceMatch;
// 	});

// 	const handleAppointmentClick = (appointment: Appointment) => {
// 		setSelectedAppointment(appointment);
// 	};

// 	const handleStatusChange = (appointmentId: number, newStatus: string) => {
// 		// Aquí iría la lógica para actualizar el estado de la cita en la base de datos
// 		console.log(`Cita ${appointmentId} actualizada a estado: ${newStatus}`);
// 	};

// 	const handleEditDialogOpen = (appointment: Appointment) => {
// 		setSelectedAppointment(appointment);
// 		setIsEditDialogOpen(true);
// 	};

// 	const handleEditDialogClose = () => {
// 		setIsEditDialogOpen(false);
// 	};

// 	const handleEditSave = () => {
// 		// Aquí iría la lógica para guardar los cambios en la cita
// 		console.log('Guardando cambios en la cita:', selectedAppointment);
// 		setIsEditDialogOpen(false);
// 	};

// 	const clearFilters = () => {
// 		setSearchQuery('');
// 		setStatusFilter(undefined);
// 		setServiceFilter(undefined);
// 	};

// 	return (
// 		<div className='flex min-h-screen bg-muted/30'>
// 			{/* Sidebar */}
// 			<aside className='hidden w-64 p-6 bg-white border-r md:block'>
// 				<div className='flex items-center mb-8'>
// 					<h2 className='text-xl font-semibold'>Serenity Spa</h2>
// 				</div>
// 				<nav className='space-y-1'>
// 					<Button variant='ghost' className='justify-start w-full'>
// 						<Calendar className='w-4 h-4 mr-2' />
// 						Citas
// 					</Button>
// 					<Button variant='ghost' className='justify-start w-full'>
// 						<Users className='w-4 h-4 mr-2' />
// 						Clientes
// 					</Button>
// 					<Button variant='ghost' className='justify-start w-full'>
// 						<User className='w-4 h-4 mr-2' />
// 						Personal
// 					</Button>
// 					<Separator className='my-4' />
// 					<Button variant='ghost' className='justify-start w-full'>
// 						Configuración
// 					</Button>
// 				</nav>
// 			</aside>

// 			{/* Main Content */}
// 			<main className='flex-1 p-6'>
// 				<div className='flex flex-col gap-6'>
// 					<div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
// 						<div>
// 							<h1 className='text-2xl font-bold tracking-tight'>
// 								Panel de Administración
// 							</h1>
// 							<p className='text-muted-foreground'>
// 								Gestiona las citas, clientes y servicios de tu
// 								spa
// 							</p>
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<Button>Nueva Cita</Button>
// 						</div>
// 					</div>

// 					<Tabs defaultValue='appointments' className='w-full'>
// 						<TabsList className='grid w-full grid-cols-3 md:w-auto'>
// 							<TabsTrigger value='appointments'>
// 								Citas
// 							</TabsTrigger>
// 							<TabsTrigger value='clients'>Clientes</TabsTrigger>
// 							<TabsTrigger value='services'>
// 								Servicios
// 							</TabsTrigger>
// 						</TabsList>
// 						<TabsContent value='appointments' className='space-y-4'>
// 							<Card>
// 								<CardHeader className='p-4'>
// 									<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
// 										<div className='flex items-center gap-2'>
// 											<Popover>
// 												<PopoverTrigger asChild>
// 													<Button
// 														variant='outline'
// 														className='gap-1'>
// 														<Calendar className='w-4 h-4' />
// 														{selectedDate
// 															? format(
// 																	selectedDate,
// 																	'PPP',
// 																	{
// 																		locale: es,
// 																	},
// 															  )
// 															: 'Seleccionar fecha'}
// 													</Button>
// 												</PopoverTrigger>
// 												<PopoverContent className='w-auto p-0'>
// 													<CalendarComponent
// 														mode='single'
// 														selected={selectedDate}
// 														onSelect={
// 															setSelectedDate
// 														}
// 														initialFocus
// 													/>
// 												</PopoverContent>
// 											</Popover>
// 											<div className='relative'>
// 												<Search className='absolute w-4 h-4 text-muted-foreground left-3 top-3' />
// 												<Input
// 													placeholder='Buscar cliente...'
// 													className='pl-9 w-[200px] md:w-[300px]'
// 													value={searchQuery}
// 													onChange={e =>
// 														setSearchQuery(
// 															e.target.value,
// 														)
// 													}
// 												/>
// 											</div>
// 										</div>
// 										<div className='flex items-center gap-2'>
// 											<DropdownMenu>
// 												<DropdownMenuTrigger asChild>
// 													<Button
// 														variant='outline'
// 														className='gap-1'>
// 														<Filter className='w-4 h-4' />
// 														Filtros
// 														{(statusFilter ||
// 															serviceFilter) && (
// 															<Badge
// 																variant='secondary'
// 																className='ml-1 rounded-sm'>
// 																{(statusFilter
// 																	? 1
// 																	: 0) +
// 																	(serviceFilter
// 																		? 1
// 																		: 0)}
// 															</Badge>
// 														)}
// 													</Button>
// 												</DropdownMenuTrigger>
// 												<DropdownMenuContent
// 													align='end'
// 													className='w-[200px]'>
// 													<DropdownMenuLabel>
// 														Filtrar por
// 													</DropdownMenuLabel>
// 													<DropdownMenuSeparator />
// 													<div className='p-2'>
// 														<p className='mb-2 text-sm font-medium'>
// 															Estado
// 														</p>
// 														<Select
// 															value={statusFilter}
// 															onValueChange={
// 																setStatusFilter
// 															}>
// 															<SelectTrigger>
// 																<SelectValue placeholder='Todos los estados' />
// 															</SelectTrigger>
// 															<SelectContent>
// 																<SelectItem value='confirmada'>
// 																	Confirmada
// 																</SelectItem>
// 																<SelectItem value='pendiente'>
// 																	Pendiente
// 																</SelectItem>
// 																<SelectItem value='cancelada'>
// 																	Cancelada
// 																</SelectItem>
// 																<SelectItem value='completada'>
// 																	Completada
// 																</SelectItem>
// 															</SelectContent>
// 														</Select>
// 													</div>
// 													<DropdownMenuSeparator />
// 													<div className='p-2'>
// 														<p className='mb-2 text-sm font-medium'>
// 															Servicio
// 														</p>
// 														<Select
// 															value={
// 																serviceFilter
// 															}
// 															onValueChange={
// 																setServiceFilter
// 															}>
// 															<SelectTrigger>
// 																<SelectValue placeholder='Todos los servicios' />
// 															</SelectTrigger>
// 															<SelectContent>
// 																{services.map(
// 																	service => (
// 																		<SelectItem
// 																			key={
// 																				service.id
// 																			}
// 																			value={
// 																				service.name
// 																			}>
// 																			{
// 																				service.name
// 																			}
// 																		</SelectItem>
// 																	),
// 																)}
// 															</SelectContent>
// 														</Select>
// 													</div>
// 													<DropdownMenuSeparator />
// 													<div className='p-2'>
// 														<Button
// 															variant='ghost'
// 															className='w-full justify-start text-sm h-9'
// 															onClick={
// 																clearFilters
// 															}>
// 															<X className='w-4 h-4 mr-2' />
// 															Limpiar filtros
// 														</Button>
// 													</div>
// 												</DropdownMenuContent>
// 											</DropdownMenu>
// 										</div>
// 									</div>
// 								</CardHeader>
// 								<CardContent className='p-0'>
// 									<div className='border rounded-md'>
// 										<div className='grid grid-cols-12 p-4 text-sm font-medium border-b bg-muted/50'>
// 											<div className='col-span-3'>
// 												Cliente
// 											</div>
// 											<div className='col-span-3'>
// 												Servicio
// 											</div>
// 											<div className='col-span-2'>
// 												Fecha
// 											</div>
// 											<div className='col-span-2'>
// 												Hora
// 											</div>
// 											<div className='col-span-2'>
// 												Estado
// 											</div>
// 										</div>
// 										<div className='divide-y'>
// 											{filteredAppointments.length > 0 ? (
// 												filteredAppointments.map(
// 													appointment => (
// 														<div
// 															key={appointment.id}
// 															className='grid grid-cols-12 p-4 text-sm cursor-pointer hover:bg-muted/50'
// 															onClick={() =>
// 																handleAppointmentClick(
// 																	appointment,
// 																)
// 															}>
// 															<div className='flex items-center col-span-3 gap-2'>
// 																<Avatar className='w-8 h-8'>
// 																	<AvatarFallback>
// 																		{appointment.clientName
// 																			.split(
// 																				' ',
// 																			)
// 																			.map(
// 																				n =>
// 																					n[0],
// 																			)
// 																			.join(
// 																				'',
// 																			)}
// 																	</AvatarFallback>
// 																</Avatar>
// 																<div>
// 																	<div className='font-medium'>
// 																		{
// 																			appointment.clientName
// 																		}
// 																	</div>
// 																	<div className='text-xs text-muted-foreground'>
// 																		{
// 																			appointment.clientEmail
// 																		}
// 																	</div>
// 																</div>
// 															</div>
// 															<div className='flex items-center col-span-3'>
// 																{
// 																	appointment.service
// 																}
// 															</div>
// 															<div className='flex items-center col-span-2'>
// 																{format(
// 																	appointment.date,
// 																	'dd/MM/yyyy',
// 																)}
// 															</div>
// 															<div className='flex items-center col-span-2'>
// 																{
// 																	appointment.time
// 																}
// 															</div>
// 															<div className='flex items-center col-span-2'>
// 																<Badge
// 																	variant='outline'
// 																	className={cn(
// 																		'font-medium',
// 																		appointment.status ===
// 																			'confirmada' &&
// 																			'border-green-500 text-green-600 bg-green-50',
// 																		appointment.status ===
// 																			'pendiente' &&
// 																			'border-yellow-500 text-yellow-600 bg-yellow-50',
// 																		appointment.status ===
// 																			'cancelada' &&
// 																			'border-red-500 text-red-600 bg-red-50',
// 																		appointment.status ===
// 																			'completada' &&
// 																			'border-blue-500 text-blue-600 bg-blue-50',
// 																	)}>
// 																	{appointment.status
// 																		.charAt(
// 																			0,
// 																		)
// 																		.toUpperCase() +
// 																		appointment.status.slice(
// 																			1,
// 																		)}
// 																</Badge>
// 															</div>
// 														</div>
// 													),
// 												)
// 											) : (
// 												<div className='p-8 text-center text-muted-foreground'>
// 													No se encontraron citas con
// 													los filtros seleccionados
// 												</div>
// 											)}
// 										</div>
// 									</div>
// 								</CardContent>
// 							</Card>

// 							{/* Detalle de la cita seleccionada */}
// 							{selectedAppointment && (
// 								<Card>
// 									<CardHeader className='flex flex-row items-center justify-between'>
// 										<div>
// 											<CardTitle>
// 												Detalles de la Cita
// 											</CardTitle>
// 											<CardDescription>
// 												Cita #{selectedAppointment.id} -{' '}
// 												{format(
// 													selectedAppointment.date,
// 													'PPP',
// 													{ locale: es },
// 												)}
// 											</CardDescription>
// 										</div>
// 										<div className='flex gap-2'>
// 											<Button
// 												variant='outline'
// 												size='sm'
// 												onClick={() =>
// 													handleEditDialogOpen(
// 														selectedAppointment,
// 													)
// 												}>
// 												Editar
// 											</Button>
// 											<DropdownMenu>
// 												<DropdownMenuTrigger asChild>
// 													<Button size='sm'>
// 														Cambiar Estado
// 													</Button>
// 												</DropdownMenuTrigger>
// 												<DropdownMenuContent align='end'>
// 													<DropdownMenuItem
// 														onClick={() =>
// 															handleStatusChange(
// 																selectedAppointment.id,
// 																'confirmada',
// 															)
// 														}>
// 														Confirmar
// 													</DropdownMenuItem>
// 													<DropdownMenuItem
// 														onClick={() =>
// 															handleStatusChange(
// 																selectedAppointment.id,
// 																'completada',
// 															)
// 														}>
// 														Marcar como Completada
// 													</DropdownMenuItem>
// 													<DropdownMenuItem
// 														onClick={() =>
// 															handleStatusChange(
// 																selectedAppointment.id,
// 																'cancelada',
// 															)
// 														}>
// 														Cancelar
// 													</DropdownMenuItem>
// 												</DropdownMenuContent>
// 											</DropdownMenu>
// 										</div>
// 									</CardHeader>
// 									<CardContent>
// 										<div className='grid gap-6 md:grid-cols-2'>
// 											<div>
// 												<h3 className='mb-4 text-lg font-semibold'>
// 													Información del Cliente
// 												</h3>
// 												<div className='space-y-2'>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Nombre:
// 														</span>
// 														<span className='font-medium'>
// 															{
// 																selectedAppointment.clientName
// 															}
// 														</span>
// 													</div>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Email:
// 														</span>
// 														<span className='font-medium'>
// 															{
// 																selectedAppointment.clientEmail
// 															}
// 														</span>
// 													</div>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Teléfono:
// 														</span>
// 														<span className='font-medium'>
// 															{
// 																selectedAppointment.clientPhone
// 															}
// 														</span>
// 													</div>
// 												</div>
// 											</div>
// 											<div>
// 												<h3 className='mb-4 text-lg font-semibold'>
// 													Detalles del Servicio
// 												</h3>
// 												<div className='space-y-2'>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Servicio:
// 														</span>
// 														<span className='font-medium'>
// 															{
// 																selectedAppointment.service
// 															}
// 														</span>
// 													</div>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Fecha:
// 														</span>
// 														<span className='font-medium'>
// 															{format(
// 																selectedAppointment.date,
// 																'PPP',
// 																{ locale: es },
// 															)}
// 														</span>
// 													</div>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Hora:
// 														</span>
// 														<span className='font-medium'>
// 															{
// 																selectedAppointment.time
// 															}
// 														</span>
// 													</div>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Duración:
// 														</span>
// 														<span className='font-medium'>
// 															{
// 																services.find(
// 																	s =>
// 																		s.name ===
// 																		selectedAppointment.service,
// 																)?.duration
// 															}{' '}
// 															minutos
// 														</span>
// 													</div>
// 													<div className='flex justify-between'>
// 														<span className='text-muted-foreground'>
// 															Precio:
// 														</span>
// 														<span className='font-medium'>
// 															$
// 															{
// 																services.find(
// 																	s =>
// 																		s.name ===
// 																		selectedAppointment.service,
// 																)?.price
// 															}
// 														</span>
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 										{selectedAppointment.notes && (
// 											<div className='mt-6'>
// 												<h3 className='mb-2 text-lg font-semibold'>
// 													Notas
// 												</h3>
// 												<p className='p-3 border rounded-md bg-muted/50'>
// 													{selectedAppointment.notes}
// 												</p>
// 											</div>
// 										)}
// 									</CardContent>
// 								</Card>
// 							)}
// 						</TabsContent>

// 						<TabsContent value='clients'>
// 							<Card>
// 								<CardHeader>
// 									<CardTitle>Gestión de Clientes</CardTitle>
// 									<CardDescription>
// 										Administra la información de tus
// 										clientes
// 									</CardDescription>
// 								</CardHeader>
// 								<CardContent>
// 									<p className='text-muted-foreground'>
// 										Aquí podrás ver y gestionar todos los
// 										clientes registrados en el sistema.
// 									</p>
// 								</CardContent>
// 							</Card>
// 						</TabsContent>

// 						<TabsContent value='services'>
// 							<Card>
// 								<CardHeader>
// 									<CardTitle>Gestión de Servicios</CardTitle>
// 									<CardDescription>
// 										Administra los servicios ofrecidos por
// 										tu spa
// 									</CardDescription>
// 								</CardHeader>
// 								<CardContent>
// 									<p className='text-muted-foreground'>
// 										Aquí podrás ver, editar y crear los
// 										servicios que ofrece tu spa.
// 									</p>
// 								</CardContent>
// 							</Card>
// 						</TabsContent>
// 					</Tabs>
// 				</div>
// 			</main>

// 			{/* Dialog para editar cita */}
// 			<Dialog
// 				open={isEditDialogOpen}
// 				onOpenChange={handleEditDialogClose}>
// 				<DialogContent className='sm:max-w-[500px]'>
// 					<DialogHeader>
// 						<DialogTitle>Editar Cita</DialogTitle>
// 						<DialogDescription>
// 							Modifica los detalles de la cita seleccionada
// 						</DialogDescription>
// 					</DialogHeader>
// 					{selectedAppointment && (
// 						<div className='grid gap-4 py-4'>
// 							<div className='grid grid-cols-4 items-center gap-4'>
// 								<label
// 									htmlFor='edit-service'
// 									className='text-right'>
// 									Servicio
// 								</label>
// 								<Select
// 									defaultValue={selectedAppointment.service}>
// 									<SelectTrigger
// 										id='edit-service'
// 										className='col-span-3'>
// 										<SelectValue placeholder='Seleccionar servicio' />
// 									</SelectTrigger>
// 									<SelectContent>
// 										{services.map(service => (
// 											<SelectItem
// 												key={service.id}
// 												value={service.name}>
// 												{service.name}
// 											</SelectItem>
// 										))}
// 									</SelectContent>
// 								</Select>
// 							</div>
// 							<div className='grid grid-cols-4 items-center gap-4'>
// 								<label
// 									htmlFor='edit-date'
// 									className='text-right'>
// 									Fecha
// 								</label>
// 								<Popover>
// 									<PopoverTrigger asChild>
// 										<Button
// 											id='edit-date'
// 											variant='outline'
// 											className='col-span-3 justify-start text-left font-normal'>
// 											{format(
// 												selectedAppointment.date,
// 												'PPP',
// 												{ locale: es },
// 											)}
// 										</Button>
// 									</PopoverTrigger>
// 									<PopoverContent className='w-auto p-0'>
// 										<CalendarComponent
// 											mode='single'
// 											selected={selectedAppointment.date}
// 											initialFocus
// 										/>
// 									</PopoverContent>
// 								</Popover>
// 							</div>
// 							<div className='grid grid-cols-4 items-center gap-4'>
// 								<label
// 									htmlFor='edit-time'
// 									className='text-right'>
// 									Hora
// 								</label>
// 								<Select defaultValue={selectedAppointment.time}>
// 									<SelectTrigger
// 										id='edit-time'
// 										className='col-span-3'>
// 										<SelectValue placeholder='Seleccionar hora' />
// 									</SelectTrigger>
// 									<SelectContent>
// 										{availableTimes.map(time => (
// 											<SelectItem key={time} value={time}>
// 												{time}
// 											</SelectItem>
// 										))}
// 									</SelectContent>
// 								</Select>
// 							</div>
// 							<div className='grid grid-cols-4 items-center gap-4'>
// 								<label
// 									htmlFor='edit-status'
// 									className='text-right'>
// 									Estado
// 								</label>
// 								<Select
// 									defaultValue={selectedAppointment.status}>
// 									<SelectTrigger
// 										id='edit-status'
// 										className='col-span-3'>
// 										<SelectValue placeholder='Seleccionar estado' />
// 									</SelectTrigger>
// 									<SelectContent>
// 										<SelectItem value='confirmada'>
// 											Confirmada
// 										</SelectItem>
// 										<SelectItem value='pendiente'>
// 											Pendiente
// 										</SelectItem>
// 										<SelectItem value='cancelada'>
// 											Cancelada
// 										</SelectItem>
// 										<SelectItem value='completada'>
// 											Completada
// 										</SelectItem>
// 									</SelectContent>
// 								</Select>
// 							</div>
// 							<div className='grid grid-cols-4 items-center gap-4'>
// 								<label
// 									htmlFor='edit-notes'
// 									className='text-right'>
// 									Notas
// 								</label>
// 								<Input
// 									id='edit-notes'
// 									defaultValue={selectedAppointment.notes}
// 									className='col-span-3'
// 								/>
// 							</div>
// 						</div>
// 					)}
// 					<DialogFooter>
// 						<Button
// 							variant='outline'
// 							onClick={handleEditDialogClose}>
// 							Cancelar
// 						</Button>
// 						<Button onClick={handleEditSave}>
// 							Guardar Cambios
// 						</Button>
// 					</DialogFooter>
// 				</DialogContent>
// 			</Dialog>
// 		</div>
// 	);
// }

// // Datos de ejemplo para servicios
// const services = [
// 	{
// 		id: 1,
// 		name: 'Masaje Relajante',
// 		description:
// 			'Un masaje suave diseñado para aliviar el estrés y promover la relajación profunda.',
// 		price: 80,
// 		duration: 60,
// 		image: '/placeholder.svg?height=300&width=400',
// 	},
// 	{
// 		id: 2,
// 		name: 'Facial Rejuvenecedor',
// 		description:
// 			'Tratamiento facial que limpia, exfolia e hidrata para una piel radiante y juvenil.',
// 		price: 95,
// 		duration: 75,
// 		image: '/placeholder.svg?height=300&width=400',
// 	},
// 	{
// 		id: 3,
// 		name: 'Terapia de Piedras Calientes',
// 		description:
// 			'Masaje terapéutico que utiliza piedras calientes para aliviar la tensión muscular.',
// 		price: 110,
// 		duration: 90,
// 		image: '/placeholder.svg?height=300&width=400',
// 	},
// 	{
// 		id: 4,
// 		name: 'Exfoliación Corporal',
// 		description:
// 			'Tratamiento que elimina células muertas de la piel dejándola suave y renovada.',
// 		price: 85,
// 		duration: 60,
// 		image: '/placeholder.svg?height=300&width=400',
// 	},
// 	{
// 		id: 5,
// 		name: 'Manicura y Pedicura',
// 		description:
// 			'Cuidado completo para manos y pies, incluyendo limado, pulido y esmalte.',
// 		price: 65,
// 		duration: 75,
// 		image: '/placeholder.svg?height=300&width=400',
// 	},
// 	{
// 		id: 6,
// 		name: 'Envoltura Corporal',
// 		description:
// 			'Tratamiento hidratante que nutre la piel y relaja el cuerpo.',
// 		price: 120,
// 		duration: 90,
// 		image: '/placeholder.svg?height=300&width=400',
// 	},
// ];

// // Horarios disponibles de ejemplo
// const availableTimes = [
// 	'09:00',
// 	'10:00',
// 	'11:00',
// 	'12:00',
// 	'13:00',
// 	'14:00',
// 	'15:00',
// 	'16:00',
// 	'17:00',
// ];

// // Tipo para las citas
// type Appointment = {
// 	id: number;
// 	clientName: string;
// 	clientEmail: string;
// 	clientPhone: string;
// 	service: string;
// 	date: Date;
// 	time: string;
// 	status: string;
// 	notes?: string;
// };

// // Datos de ejemplo para citas
// const appointments: Appointment[] = [
// 	{
// 		id: 1,
// 		clientName: 'María López',
// 		clientEmail: 'maria@example.com',
// 		clientPhone: '+34 612 345 678',
// 		service: 'Masaje Relajante',
// 		date: new Date(),
// 		time: '10:00',
// 		status: 'confirmada',
// 		notes: 'Cliente habitual, prefiere temperatura ambiente cálida.',
// 	},
// 	{
// 		id: 2,
// 		clientName: 'Carlos Rodríguez',
// 		clientEmail: 'carlos@example.com',
// 		clientPhone: '+34 623 456 789',
// 		service: 'Facial Rejuvenecedor',
// 		date: new Date(),
// 		time: '12:00',
// 		status: 'pendiente',
// 	},
// 	{
// 		id: 3,
// 		clientName: 'Ana Martínez',
// 		clientEmail: 'ana@example.com',
// 		clientPhone: '+34 634 567 890',
// 		service: 'Terapia de Piedras Calientes',
// 		date: new Date(),
// 		time: '15:00',
// 		status: 'cancelada',
// 		notes: 'Canceló por enfermedad, reprogramar para la próxima semana.',
// 	},
// 	{
// 		id: 4,
// 		clientName: 'Javier García',
// 		clientEmail: 'javier@example.com',
// 		clientPhone: '+34 645 678 901',
// 		service: 'Exfoliación Corporal',
// 		date: new Date(new Date().setDate(new Date().getDate() + 1)),
// 		time: '11:00',
// 		status: 'confirmada',
// 	},
// 	{
// 		id: 5,
// 		clientName: 'Laura Sánchez',
// 		clientEmail: 'laura@example.com',
// 		clientPhone: '+34 656 789 012',
// 		service: 'Manicura y Pedicura',
// 		date: new Date(new Date().setDate(new Date().getDate() + 1)),
// 		time: '16:00',
// 		status: 'confirmada',
// 	},
// 	{
// 		id: 6,
// 		clientName: 'Miguel Fernández',
// 		clientEmail: 'miguel@example.com',
// 		clientPhone: '+34 667 890 123',
// 		service: 'Masaje Relajante',
// 		date: new Date(new Date().setDate(new Date().getDate() - 1)),
// 		time: '14:00',
// 		status: 'completada',
// 	},
// 	{
// 		id: 7,
// 		clientName: 'Sofía Pérez',
// 		clientEmail: 'sofia@example.com',
// 		clientPhone: '+34 678 901 234',
// 		service: 'Envoltura Corporal',
// 		date: new Date(new Date().setDate(new Date().getDate() - 1)),
// 		time: '09:00',
// 		status: 'completada',
// 	},
// ];

import React from 'react'

const page = () => {
	return (
		<div>page</div>
	)
}

export default page

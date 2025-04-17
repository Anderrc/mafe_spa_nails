export interface Action {
	setCurrentStep: (currentStep: number) => void;
	updateFromData: (data: {
		nombre: string;
		apellido: string;
		correo: string;
		document: string;
		telefono: string;
		notas: string;
	}) => void;
	updateFormData: (formData: {
		nombre: string;
		apellido: string;
		correo: string;
		document: string;
		telefono: string;
		notas: string;
	}) => void;
	updateSelectedDate: (selectedDate: string) => void;
	updateSelectedTime: (selectedTime: string) => void;
	updateSelectedServices: (selectedServices: number | undefined) => void;
	setServices: (
		services: {
			id: number;
			name: string;
			description: string;
			price: number;
			duration: string;
		}[],
	) => void;
	setDates: (dates: string[]) => void;
	setIsLoading: (isLoading: boolean) => void;
}

export type ServicesState = {
	id: number;
	name: string;
	description: string;
	price: number;
	duration: string;
};

export interface State {
	services: ServicesState[] | [];
	dates: string[];
	selectedServices: number | undefined;
	selectedDate: string;
	selectedTime: string;
	isLoading: boolean;
	formData: {
		nombre: string;
		apellido: string;
		document: string;
		telefono: string;
		notas: string;
		correo: string;
	};
	currentStep: number;
}


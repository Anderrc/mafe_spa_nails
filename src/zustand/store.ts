import { Action, State } from '@/models/useStore';
import { create } from 'zustand';

export const useStore = create<State & Action>(set => ({
	services: [],
	selectedServices: undefined,
	selectedDate: '',
	selectedTime: '',
	currentStep: 1,
	dates: [],
	isLoading: false,
	formData: {
		nombre: '',
		apellido: '',
		document: '',
		telefono: '',
		correo: '',
		notas: '',
	},
	reset: () =>
		set({
			services: [],
			selectedServices: undefined,
			selectedDate: '',
			selectedTime: '',
			currentStep: 1,
			dates: [],
			isLoading: false,
			formData: {
				nombre: '',
				apellido: '',
				document: '',
				telefono: '',
				correo: '',
				notas: '',
			},
		}),
	updateFormData: (formData: {
		nombre: string;
		apellido: string;
		document: string;
		correo: string;
		telefono: string;
		notas: string;
	}) => set({ formData }),
	updateFromData: (
		data: Partial<{
			nombre: string;
			apellido: string;
			correo: string;
			telefono: string;
			notas: string;
		}>,
	) => set(state => ({ formData: { ...state.formData, ...data } })),
	updateSelectedDate: (selectedDate: string) => set({ selectedDate }),
	updateSelectedTime: (selectedTime: string) => set({ selectedTime }),
	updateSelectedServices: (selectedServices: number | undefined) =>
		set({ selectedServices }),
	setCurrentStep: (currentStep: number) => set({ currentStep }),
	setServices: (
		services: {
			id: number;
			name: string;
			description: string;
			price: number;
			duration: string;
		}[],
	) => set({ services }),
	setDates: (dates: string[]) => set({ dates }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));


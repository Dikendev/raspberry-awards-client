import { FormModalData } from "./CreateMovieModalForm";

export interface FormValue {
	title?: string;
	year?: string | "";
	studio?: string;
	producer?: string;
	winner?: string;
}

export interface ValidationFormResponse {
	errors: FormValue;
	isValid: boolean;
}

export const validationForm = (
	formData: FormModalData
): ValidationFormResponse => {
	const { title, year, studio, producer, winner } = formData;
	const newErrors: FormValue = {};

	if (title.trim().length < 1) {
		newErrors.title = "Title is required.";
	}
	if (String(year) === "" || Number(year) < 1500 || Number(year) > 2500) {
		newErrors.year = "Year must be between 1500 and 2500.";
	}
	if (studio.trim().length < 2) {
		newErrors.studio = "Studio is required.";
	}
	if (producer.trim().length < 2) {
		newErrors.producer = "Producer is required.";
	}
	if (winner.trim().length < 1) {
		newErrors.winner = "Winner is required.";
	}

	return { errors: newErrors, isValid: Object.keys(newErrors).length === 0 };
};

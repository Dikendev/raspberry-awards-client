import { Winner } from "./MovieInterface";

export interface CreateMovie {
	title: string;
	year: number;
	studio: string;
	producer: string;
	winner: Winner;
}

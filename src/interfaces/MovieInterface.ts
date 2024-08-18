export interface Studio {
	_id: string;
	name: string;
}

export interface Producer {
	_id: string;
	name: string;
}

export interface Movie {
	_id: string;
	title: string;
	year: number;
	studio: Studio[];
	producer: Producer[];
	winner: string;
}

export enum Winner {
	YES = "yes",
	NO = "no",
}

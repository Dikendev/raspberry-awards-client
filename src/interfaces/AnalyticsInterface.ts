export interface Movie {
	year: number;
	winner: string;
}

export interface Producer {
	name: string;
	movies: Movie[];
}

export interface AnalyticsResult {
	producer: Producer;
	largestGap: number;
}

export interface FastestWinsResult {
	producer: Producer;
	fastestGap: number;
}

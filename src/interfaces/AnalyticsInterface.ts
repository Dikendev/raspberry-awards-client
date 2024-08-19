export interface Movie {
	year: number;
	winner: string;
}

export interface Producer {
	name: string;
	movies: Movie[];
}

export interface LargestGapResult {
	producer: Producer;
	largestGap: number;
}

export interface FastestWinsResult {
	producer: Producer;
	fastestWins: number;
}

export interface AnalyticsInterface {
	largestGap: LargestGapResult;
	fastestWins: FastestWinsResult;
}

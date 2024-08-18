export interface SearchBarProps {
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchQueries: {
		title: string;
		year: string;
		producer: string;
		studio: string;
	};
	t: (key: string) => string;
}

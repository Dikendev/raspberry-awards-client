export interface PaginationControlsProps {
	limit: number;
	handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	t: (key: string) => string;
}

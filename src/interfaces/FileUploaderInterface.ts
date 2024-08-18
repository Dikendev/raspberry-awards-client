export interface FileUploaderProps {
	handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	csvFileName: string | null;
	t: (key: string) => string;
}

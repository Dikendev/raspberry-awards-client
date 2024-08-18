export interface HealthApiInterface {
	status: string;
	info: Info;
	error: Error;
	details: Info;
}

export interface Info {
	api: Api;
}

export interface Api {
	status: string;
	uptime: number;
}

export interface Details {
	api: Api;
}

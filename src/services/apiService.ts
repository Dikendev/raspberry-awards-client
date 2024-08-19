import axios from "axios";
import { CreateMovie } from "../interfaces/CreateMovieInterface";
import {
	AnalyticsInterface,
	FastestWinsResult,
	LargestGapResult,
} from "../interfaces/AnalyticsInterface";
import { HealthApiInterface } from "../interfaces/health-api/HealthApiInterface";
import { Movie } from "../interfaces/MovieInterface";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchMovies = async (
	page: number,
	limit: number,
	setLoading: (loading: boolean) => void
): Promise<Movie[]> => {
	setLoading(true);
	try {
		const url = `${BASE_URL}/movie?page=${page}&limit=${limit}`;
		const response = await axios.get<Movie[]>(url);
		return response.data;
	} catch (error) {
		console.info("Fetch movies failed:", error);
		return [];
	} finally {
		setLoading(false);
	}
};

export const updateMovie = async (
	movieId: string,
	updateData: Partial<CreateMovie>,
	setLoading: (loading: boolean) => void
): Promise<Movie> => {
	setLoading(true);
	try {
		const response = await axios.patch<Movie>(
			`${BASE_URL}/movie/${movieId}`,
			updateData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.info("Error updating movie:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const createMovie = async (
	newMovie: Partial<CreateMovie>,
	setLoading: (loading: boolean) => void
): Promise<Movie> => {
	setLoading(true);
	try {
		const response = await axios.post<Movie>(`${BASE_URL}/movie`, newMovie, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (err) {
		console.info("Error updating movie:", err);
		throw err;
	} finally {
		setLoading(false);
	}
};

export const deleteMovie = async (
	movieId: string,
	setLoading: (loading: boolean) => void
): Promise<void> => {
	setLoading(true);
	try {
		await axios.delete(`${BASE_URL}/movie/${movieId}`);
	} catch (error) {
		console.info("Error deleting movie:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const fetchAnalyticsData = async (
	setLoading: (loading: boolean) => void
): Promise<AnalyticsInterface> => {
	setLoading(true);
	try {
		const fastestUrl = `${BASE_URL}/analytics/fastest-wins`;
		const largestGapUrl = `${BASE_URL}/analytics/largest-gap`;

		const [largestGapResponse, fastestWinsResponse] = await Promise.all([
			axios.get<LargestGapResult>(largestGapUrl),
			axios.get<FastestWinsResult>(fastestUrl),
		]);

		return {
			largestGap: largestGapResponse.data,
			fastestWins: fastestWinsResponse.data,
		};
	} catch (error) {
		console.info("Error deleting movie:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const fetchProducerMovieCounts = async (
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const movieCounts = `${BASE_URL}/analytics/movie-counts`;
		const response = await axios.get(movieCounts);
		return response.data;
	} catch (error) {
		console.info("Error fetching producer data:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const checkHealthApi = async (): Promise<HealthApiInterface> => {
	try {
		const response = await axios.get<HealthApiInterface>(`${BASE_URL}/health`);
		return response.data;
	} catch (error) {
		console.info("Error checking health:", error);
		throw error;
	}
};

export const uploadFile = async (
	file: File,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await axios.post(`${BASE_URL}/upload-file/csv`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		console.info("Error uploading file:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const fetchMoviesByYear = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/analytics/movie-counts-by-year`
		);

		return response.data;
	} catch (error) {
		console.info("Error fetching movies by year:", error);
		throw error;
	}
};

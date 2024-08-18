import axios from "axios";
import { CreateMovie } from "../pages/RaspberyAwards";
import { AnalyticsResult, FastestWinsResult } from "../pages/AnalyticsPage";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchData = async (
	endpoint: string,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const response = await axios.get(endpoint);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const fetchMovies = async (
	page: number,
	limit: number,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const url = `${BASE_URL}/movie?page=${page}&limit=${limit}`;
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Fetch movies failed:", error);
		return [];
	} finally {
		setLoading(false);
	}
};

export const updateMovie = async (
	movieId: string,
	updateData: any,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const response = await axios.patch(
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
		console.error("Error updating movie:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const createMovie = async (
	newMovie: Partial<CreateMovie>,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const response = await axios.post(`${BASE_URL}/movie`, newMovie, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (err) {
		console.error("Error updating movie:", err);
		throw err;
	} finally {
		setLoading(false);
	}
};

export const deleteMovie = async (
	movieId: string,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const response = await axios.delete(`${BASE_URL}/movie/${movieId}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting movie:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

export const fetchAnalyticsData = async (
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	try {
		const fastestUrl = `${BASE_URL}/analytics/fastest-wins`;
		const largestGapUrl = `${BASE_URL}/analytics/largest-gap`;

		console.log("largestGapUrl", largestGapUrl);
		console.log("fastestUrl", fastestUrl);

		const [largestGapResponse, fastestWinsResponse] = await Promise.all([
			axios.get<AnalyticsResult>(largestGapUrl),
			axios.get<FastestWinsResult>(fastestUrl),
		]);

		return {
			largestGapResult: largestGapResponse.data,
			fastestWinsResult: fastestWinsResponse.data,
		};
	} catch (error) {
		console.error("Error deleting movie:", error);
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
		console.log("movieCounts", movieCounts);
		const response = await axios.get(movieCounts);

		console.log("response", response);

		return response.data;
	} catch (error) {
		console.error("Error fetching producer data:", error);
		throw error;
	} finally {
		setLoading(false);
	}
};

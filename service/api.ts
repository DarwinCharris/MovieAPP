// services/api.ts
import { TMDB_API_KEY } from "@env";

import { TMDB_ACCESS_TOKEN } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
};

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path: string;
  popularity: number;
  original_language: string;
  original_title: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export const fetchPopularMovies = async (
  page: number = 1
): Promise<MoviesResponse> => {
  const url = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch popular movies");
  }
};

export const fetchGenres = async (): Promise<GenresResponse> => {
  const url = `${BASE_URL}/genre/movie/list?language=es-ES`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching genres:", {
        status: response.status,
        errorData,
      });
      throw new Error(`Failed to fetch genres: ${response.status}`);
    }

    const data = await response.json();
    console.log("Genres fetched successfully"); // Log de depuración
    return data;
  } catch (error) {
    console.error("Network error fetching genres:", error);
    throw new Error("Network error while fetching genres");
  }
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  return response.json();
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
};
// services/api.ts
export const fetchMoviesByGenre = async (
  genreId: number | null,
  page: number = 1
): Promise<MoviesResponse> => {
  const baseUrl = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc`;

  const url = genreId ? `${baseUrl}&with_genres=${genreId}` : baseUrl;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error(
      genreId
        ? "Failed to fetch movies by genre"
        : "Failed to fetch popular movies"
    );
  }
};

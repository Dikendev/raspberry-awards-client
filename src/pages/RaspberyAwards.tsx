import React, { useEffect, useState } from 'react';
import { createMovie, deleteMovie, fetchMovies, updateMovie } from '../services/apiService';
import MovieModal from '../components/MovieModal';
import Modal from 'react-modal';
import AddMovieForm from '../components/AddComponentForm';
import Spinner from '../components/Spinner';
import { useTranslation } from 'react-i18next';

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
  YES = 'yes',
  NO = 'no',
}

export interface CreateMovie {
  title: string;
  year: number;
  studio: string;
  producer: string;
  winner: Winner;
}

const RaspberryAwards: React.FC = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(page, limit, setLoading);
        setMovies(data);
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };
    loadMovies();
  }, [page, limit, t]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Reset page to 1 when limit changes
  };

  const handleUpdate = async (movieId: string) => {
    const movieToUpdate = movies.find(movie => movie._id === movieId);
    if (movieToUpdate) {
      setSelectedMovie(movieToUpdate);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (movieId: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(movieId, setLoading);
        const data = await fetchMovies(page, limit, setLoading);
        setMovies(data);
      } catch (err) {
        setError('Failed to delete movie.');
      }
    }
  };

  const handleSave = async (updatedMovie: Partial<CreateMovie>) => {
    if (selectedMovie) {
      try {
        await updateMovie(selectedMovie._id, updatedMovie, setLoading);
        const data = await fetchMovies(page, limit, setLoading);
        setMovies(data);
      } catch (err) {
        setError('Failed to update movie.');
      }
    }
  };

  const handleAddMovie = async (newMovie: Partial<CreateMovie>) => {
    try {
      await createMovie(newMovie, setLoading);
      const data = await fetchMovies(page, limit, setLoading);
      setMovies(data);
      setIsAddMovieModalOpen(false);
    } catch (err) {
      setError('Failed to add movie.');
    }
  };

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <Spinner />}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsAddMovieModalOpen(true)}
      >
        {t('addMovie')}
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">{t('title')}</th>
              <th className="py-2">{t('year')}</th>
              <th className="py-2">{t('producers')}</th>
              <th className="py-2">{t('studios')}</th>
              <th className="py-2">{t('winner')}</th>
              <th className="py-2">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td className="border px-4 py-2">{movie.title}</td>
                <td className="border px-4 py-2">{movie.year}</td>
                <td className="border px-4 py-2">
                  {movie.producer.map((p) => p.name).join(', ')}
                </td>
                <td className="border px-4 py-2">
                  {movie.studio.map((s) => s.name).join(', ')}
                </td>
                <td className="border px-4 py-2">{movie.winner}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center flex-wrap gap-1">
                    <button
                      className="bg-teal-500 text-white w-full sm:w-24 h-10 rounded"
                      onClick={() => handleUpdate(movie._id)}
                    >
                      {t('update')}
                    </button>
                    <button
                      className="bg-red-600 text-white w-full sm:w-24 h-10 rounded"
                      onClick={() => handleDelete(movie._id)}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <label htmlFor="limit" className="mr-2">{t('itemsPerPage')}:</label>
          <select
            id="limit"
            className="bg-white border border-gray-300 px-4 py-2 rounded"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="flex justify-center sm:w-1/2 space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setPage(page => Math.max(page - 1, 1))}
          >
            {t('previous')}
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setPage(page => page + 1)}
          >
            {t('next')}
          </button>
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          movie={selectedMovie}
          onSave={handleSave}
        />
      )}

      <Modal
        isOpen={isAddMovieModalOpen}
        onRequestClose={() => setIsAddMovieModalOpen(false)}
        contentLabel="Add Movie"
        className="bg-white p-5 rounded-lg max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <h2 className="text-xl font-bold mb-4">Add Movie</h2>
        <AddMovieForm onAddMovie={handleAddMovie} onClose={() => setIsAddMovieModalOpen(false)} />
      </Modal>

      {error && (
        <Modal
          isOpen={!!error}
          onRequestClose={closeErrorModal}
          contentLabel={t('error')}
          className="bg-white p-5 rounded-lg max-w-lg mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
          <h2 className="text-xl font-bold mb-4">{t('error')}</h2>
          <p>{t(error)}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={closeErrorModal}
          >
            {t('close')}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default RaspberryAwards;
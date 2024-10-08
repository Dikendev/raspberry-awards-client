import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CreateMovie } from '../../interfaces/CreateMovieInterface';
import { Movie, Winner } from '../../interfaces/MovieInterface';
import { FormValue, validationForm } from './validationForm';

interface MovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  movie?: Movie;
  onSave: (movie: Partial<CreateMovie>) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onRequestClose, movie, onSave }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [studio, setStudio] = useState('');
  const [producer, setProducer] = useState('');
  const [winner, setWinner] = useState('');
  const [errors, setErrors] = useState<FormValue>({});

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setYear(movie.year);
      setWinner(movie.winner);
      setStudio(movie.studio.map(s => s.name).join(', '));
      setProducer(movie.producer.map(p => p.name).join(', '));
    }
  }, [movie]);

  const validate = () => {
    const {isValid, errors} = validationForm({title, year, studio, producer, winner});
    setErrors(errors);
    return isValid
  };

  const handleSave = () => {
    if (validate()) {
      onSave({
        title,
        year: year as number,
        winner: winner as Winner,
        studio,
        producer
      });
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Movie"
      className="bg-white p-5 rounded-lg max-w-lg mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <h2 className="text-xl font-bold mb-4">Update Movie</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : '')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Studio:</label>
        <input
          type="text"
          value={studio}
          onChange={(e) => setStudio(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.studio && <p className="text-red-500 text-sm">{errors.studio}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Producer:</label>
        <input
          type="text"
          value={producer}
          onChange={(e) => setProducer(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.producer && <p className="text-red-500 text-sm">{errors.producer}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Winner:</label>
          <select
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        {errors.winner && <p className="text-red-500 text-sm">{errors.winner}</p>}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default MovieModal;
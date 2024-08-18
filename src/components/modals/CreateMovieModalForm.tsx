import React, { useState } from 'react';
import { CreateMovie } from '../../interfaces/CreateMovieInterface';
import { Winner } from '../../interfaces/MovieInterface';
import { FormValue, validationForm } from './validationForm';

interface AddMovieFormProps {
  onAddMovie: (newMovie: Partial<CreateMovie>) => void;
  onClose: () => void; 
}

export interface FormModalData   {
  title: string;
  year: number | ''
  studio: string;
  producer: string;
  winner: string
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAddMovie , onClose}) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [studio, setStudio] = useState('');
  const [producer, setProducer] = useState('');
  const [winner, setWinner] = useState<Winner| ''>('');
  const [successMessage] = useState('');
  const [errors, setErrors] = useState<FormValue>({});

  const validate = () => {
    const {isValid, errors} = validationForm({title, year, studio, producer, winner});
    setErrors(errors);
    return isValid
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const newMovie: Partial<CreateMovie> = {
        title,
        year: year ? parseInt(year.toString(), 10) : undefined,
        studio,
        producer,
        winner: winner as Winner,
      };
      onAddMovie(newMovie);
      setTitle('');
      setYear('');
      setStudio('');
      setProducer('');
      setWinner('');
      onClose()
    }
  };

   return (
    <div>
      {successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : '')}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Studio</label>
          <input
            type="text"
            value={studio}
            onChange={(e) => setStudio(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {errors.studio && <p className="text-red-500 text-sm">{errors.studio}</p>}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Producer</label>
          <input
            type="text"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {errors.producer && <p className="text-red-500 text-sm">{errors.producer}</p>}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Winner</label>
          <select
            value={winner}
            onChange={(e) => setWinner(e.target.value as Winner)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select</option>
            <option value={Winner.YES}>Yes</option>
            <option value={Winner.NO}>No</option>
          </select>
          {errors.winner && <p className="text-red-500 text-sm">{errors.winner}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;


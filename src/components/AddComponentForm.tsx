import React, { useState } from 'react';
import { CreateMovie } from '../interfaces/CreateMovieInterface';
import { Winner } from '../interfaces/MovieInterface';

interface AddMovieFormProps {
  onAddMovie: (newMovie: Partial<CreateMovie>) => void;
  onClose: () => void; 
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAddMovie , onClose}) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [studio, setStudio] = useState('');
  const [producer, setProducer] = useState('');
  const [winner, setWinner] = useState<Winner| ''>('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setSuccessMessage('Movie added successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      onClose(); // Close the modal
    }, 2000); // Show the message for 2 seconds
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
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Studio</label>
          <input
            type="text"
            value={studio}
            onChange={(e) => setStudio(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Producer</label>
          <input
            type="text"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
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
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;


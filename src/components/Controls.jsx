import { FaTrash, FaPlay } from 'react-icons/fa';

const Controls = ({ handlePlay, handleClear }) => {
  return (
    <section className="absolute top-0 left-10 flex gap-3 bg-white border-2 border-gray-300 rounded-b-lg border-t-0 p-4">
      <button
        className="w-15 aspect-square p-4 text-white bg-blue-400 rounded-md control-button"
        onClick={handlePlay}
      >
        <FaPlay />
      </button>
      <button
        className="w-15 aspect-square p-4 text-white bg-blue-400 rounded-md control-button"
        onClick={handleClear}
      >
        <FaTrash />
      </button>
      {/* <button className="w-15 aspect-square p-4 text-white bg-blue-500 border-2 border-gray-500 rounded-md control-button"></button> */}
    </section>
  );
};

export default Controls;

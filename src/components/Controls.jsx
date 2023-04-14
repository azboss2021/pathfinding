import { FaTrash, FaPlay } from 'react-icons/fa';

const Controls = ({ handlePlay, handleClear }) => {
  return (
    <section className="fixed top-0 left-0 flex gap-3 bg-white border-2 border-gray-600 border-t-0 p-3">
      <button
        className="w-15 aspect-square p-3 text-white bg-blue-400 text-xl rounded-md control-button"
        onClick={handlePlay}
      >
        <FaPlay />
      </button>
      <button
        className="w-15 aspect-square p-3 text-white bg-blue-400 text-xl rounded-md control-button"
        onClick={handleClear}
      >
        <FaTrash />
      </button>
      {/* <button className="w-15 aspect-square p-4 text-white bg-blue-500 border-2 border-gray-500 rounded-md control-button"></button> */}
    </section>
  );
};

export default Controls;

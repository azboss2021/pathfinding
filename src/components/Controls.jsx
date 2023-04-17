import { FaTrash, FaRandom } from 'react-icons/fa';

const Controls = ({ aStar, resetGrid, randomizeObstacles }) => {
  return (
    <section className="p-4 flex gap-2 flex-wrap max-w-max">
      <button
        className="bg-blue-400 py-2 px-4 text-white rounded-md hover:bg-blue-500 font-bold"
        onClick={randomizeObstacles}
      >
        <FaRandom />
      </button>
      <button
        className="bg-blue-400 py-2 px-4 text-white rounded-md hover:bg-blue-500 font-bold"
        onClick={resetGrid}
      >
        <FaTrash />
      </button>
      <button
        className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 font-bold"
        onClick={aStar}
      >
        A*
      </button>
      <button className="bg-blue-200 py-2 px-4 text-white rounded-md font-bold">
        Dijkstra
      </button>
      <button className="bg-blue-200 py-2 px-4 text-white rounded-md font-bold">
        Floyd-Warshall
      </button>
      <button className="bg-blue-200 py-2 px-4 text-white rounded-md font-bold">
        Bellman-Ford
      </button>
    </section>
  );
};

export default Controls;

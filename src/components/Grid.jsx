import { useContext } from 'react';
import { UserContext } from '../App';
import Node from './Node';

const Grid = () => {
  const [grid, handleMouseDown, handleMouseEnter] = useContext(UserContext);

  return (
    <section>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((col, colIndex) => (
            <Node
              key={colIndex}
              col={col}
              rowIndex={rowIndex}
              colIndex={colIndex}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Grid;

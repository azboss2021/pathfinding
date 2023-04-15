import Node from './Node';

const Grid = ({ grid, handleMouseDown, handleMouseEnter, setMouseDown }) => {
  return (
    <section className="flex flex-col max-w-screen-xl mx-auto">
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
              setMouseDown={setMouseDown}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Grid;

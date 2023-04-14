import React from 'react';

const Grid = ({ grid, handleMouseOverNode }) => {
  const gridMap = grid.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="flex">
        {row.map((node, nodeIndex) => {
          if (node == 'O') {
            return (
              <div
                key={nodeIndex}
                className="flex-1 aspect-square border border-gray-100 bg-black node"
                onClick={(e) =>
                  handleMouseOverNode(e, rowIndex, nodeIndex, node)
                }
              ></div>
            );
          } else if (node == 'S') {
            return (
              <div
                key={nodeIndex}
                className="flex-1 aspect-square border border-gray-100 bg-green-500 node"
                onClick={(e) =>
                  handleMouseOverNode(e, rowIndex, nodeIndex, node)
                }
              ></div>
            );
          } else if (node == 'T') {
            return (
              <div
                key={nodeIndex}
                className="flex-1 aspect-square border border-gray-100 bg-red-500 node"
                onClick={(e) =>
                  handleMouseOverNode(e, rowIndex, nodeIndex, node)
                }
              ></div>
            );
          } else {
            return (
              <div
                key={nodeIndex}
                className="flex-1 aspect-square border border-gray-100 bg-white node"
                onClick={(e) =>
                  handleMouseOverNode(e, rowIndex, nodeIndex, node)
                }
              ></div>
            );
          }
        })}
      </div>
    );
  });

  return <section>{gridMap}</section>;
};

export default Grid;

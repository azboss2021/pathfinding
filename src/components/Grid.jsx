import React from 'react';

const Grid = ({ grid }) => {
  const gridMap = grid.map((row, index) => {
    return (
      <div key={index} className="flex">
        {row.map((node, index) => {
          if (node == 'O') {
            return (
              <div
                key={index}
                className="flex-1 aspect-square border border-gray-200 bg-black"
              ></div>
            );
          } else if (node == 'S') {
            return (
              <div
                key={index}
                className="flex-1 aspect-square border border-gray-200 bg-green-500"
              ></div>
            );
          } else if (node == 'T') {
            return (
              <div
                key={index}
                className="flex-1 aspect-square border border-gray-200 bg-red-500"
              ></div>
            );
          } else {
            return (
              <div
                key={index}
                className="flex-1 aspect-square border border-gray-200"
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

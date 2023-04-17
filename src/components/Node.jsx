import { FaSkull } from 'react-icons/fa';

const Node = ({
  col,
  rowIndex,
  colIndex,
  handleMouseDown,
  handleMouseEnter,
  setMouseDown,
}) => {
  let classes;
  let node;

  switch (col.state) {
    case 'O':
      // classes =
      //   'flex-1 aspect-square node border-slate-100 border bg-slate-500';
      node = (
        <div
          className="flex-1 aspect-square node border-slate-100 border bg-white"
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={() => handleMouseDown(col.state, rowIndex, colIndex)}
          onMouseEnter={() => handleMouseEnter(col.state, rowIndex, colIndex)}
        >
          <div className="bg-slate-500 rounded-md w-full h-full"></div>
        </div>
      );
      break;
    case 'S':
      classes =
        'flex-1 aspect-square node border-slate-100 border bg-green-500';
      break;
    case 'T':
      classes = 'flex-1 aspect-square node border-slate-100 border bg-red-500';
      break;
    case 'N':
      classes =
        'flex-1 aspect-square neighbor border-slate-100 border bg-blue-300';
      // node = (
      //   <div
      //     className="flex-1 aspect-square node border-slate-100 border bg-white"
      //     onDragStart={(e) => e.preventDefault()}
      //     onMouseDown={() => handleMouseDown(col.state, rowIndex, colIndex)}
      //     onMouseEnter={() => handleMouseEnter(col.state, rowIndex, colIndex)}
      //   >
      //     <div className="bg-blue-300 rounded-md w-full h-full"></div>
      //   </div>
      // );
      break;
    case 'L':
      classes =
        'flex-1 aspect-square node border-slate-100 border bg-orange-200';
      break;
    case 'P':
      classes = 'flex-1 aspect-square path border-blue-600 border bg-blue-600';
      // node = (
      //   <div
      //     className="flex-1 aspect-square path border-purple-200 border bg-purple-200"
      //     onDragStart={(e) => e.preventDefault()}
      //     onMouseDown={() => handleMouseDown(col.state, rowIndex, colIndex)}
      //     onMouseEnter={() => handleMouseEnter(col.state, rowIndex, colIndex)}
      //   >
      //     <div className="bg-green-200 rounded-xl w-full h-full"></div>
      //   </div>
      // );
      break;
    case 'M':
      node = (
        <div
          className="flex-1 aspect-square empty-node border-slate-100 border bg-white text-3xl"
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={() => handleMouseDown(col.state, rowIndex, colIndex)}
          onMouseEnter={() => handleMouseEnter(col.state, rowIndex, colIndex)}
        >
          <FaSkull />
        </div>
      );
      break;
    default:
      classes =
        'flex-1 aspect-square empty-node border-slate-100 border bg-white';
      break;
  }

  if (col.state != 'M' && col.state != 'O')
    node = (
      <div
        className={classes}
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={() => handleMouseDown(col.state, rowIndex, colIndex)}
        onMouseEnter={() => handleMouseEnter(col.state, rowIndex, colIndex)}
      ></div>
    );

  return node;
};

export default Node;

const Node = ({
  col,
  rowIndex,
  colIndex,
  handleMouseDown,
  handleMouseEnter,
  setMouseDown,
}) => {
  let classes;

  switch (col) {
    case 'O':
      classes = 'w-10 h-10 node border-gray-200 border-2 bg-gray-500';
      break;
    case 'S':
      classes = 'w-10 h-10 node border-gray-200 border-2 bg-green-500';
      break;
    case 'T':
      classes = 'w-10 h-10 node border-gray-200 border-2 bg-red-500';
      break;
    default:
      classes = 'w-10 h-10 border-gray-200 border-2 bg-white';
      break;
  }

  const node = (
    <div
      className={classes}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={() => handleMouseDown(col, rowIndex, colIndex)}
      onMouseUp={() => setMouseDown(false)}
      onMouseEnter={() => handleMouseEnter(col, rowIndex, colIndex)}
    ></div>
  );

  return node;
};

export default Node;

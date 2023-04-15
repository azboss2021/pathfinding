const Node = ({
  col,
  rowIndex,
  colIndex,
  handleMouseDown,
  handleMouseEnter,
}) => {
  let classes;

  switch (col) {
    case 'O':
      classes = 'w-10 h-10 node border-gray-500 border bg-gray-400';
      break;
    case 'S':
      classes = 'w-10 h-10 node border-gray-500 border bg-green-500';
      break;
    case 'T':
      classes = 'w-10 h-10 node border-gray-500 border bg-red-500';
      break;
    default:
      classes = 'w-10 h-10 empty-node border-gray-500 border bg-white';
      break;
  }

  const node = (
    <div
      className={classes}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={() => handleMouseDown(col, rowIndex, colIndex)}
      onMouseEnter={() => handleMouseEnter(col, rowIndex, colIndex)}
    ></div>
  );

  return node;
};

export default Node;

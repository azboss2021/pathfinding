const Node = ({
  col,
  rowIndex,
  colIndex,
  handleMouseDown,
  handleMouseEnter,
  setMouseDown,
}) => {
  let classes;

  switch (col.state) {
    case 'O':
      classes = 'flex-1 aspect-square node border-gray-500 border bg-gray-400';
      break;
    case 'S':
      classes = 'flex-1 aspect-square node border-gray-500 border bg-green-500';
      break;
    case 'T':
      classes = 'flex-1 aspect-square node border-gray-500 border bg-red-500';
      break;
    case 'N':
      classes = 'flex-1 aspect-square node border-gray-500 border bg-pink-500';
      break;
    default:
      classes =
        'flex-1 aspect-square empty-node border-gray-500 border bg-white';
      break;
  }

  const node = (
    <div
      className={classes}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={() => {
        setMouseDown(true);
        handleMouseDown(col.state, rowIndex, colIndex);
      }}
      onMouseUp={() => setMouseDown(false)}
      onMouseEnter={() => handleMouseEnter(col.state, rowIndex, colIndex)}
    ></div>
  );

  return node;
};

export default Node;

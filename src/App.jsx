import { useEffect, useState } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';

const ROWS = 35;
const COLS = 50;

function App() {
  const [grid, setGrid] = useState([]);
  const [sourcePlaced, setSourcePlaced] = useState(false);
  const [targetPlaced, setTargetPlaced] = useState(false);

  useEffect(() => {
    setupGrid();
  }, []);

  const handlePlay = () => {};

  const handleClear = () => {
    setupGrid();
  };

  const handleMouseOverNode = (e, row, col, nodeContent) => {
    let tempGrid = grid.slice().slice();
    if (!nodeContent) {
      if (!sourcePlaced) {
        console.log('Row: ' + row + ' Col: ' + col);
        tempGrid[row][col] = 'S';
        setSourcePlaced(true);
      } else if (!targetPlaced) {
        tempGrid[row][col] = 'T';
        setTargetPlaced(true);
      } else {
        tempGrid[row][col] = 'O';
      }
    }
    setGrid(tempGrid.slice().slice());
  };

  const setupGrid = () => {
    let tempGrid = new Array(ROWS);
    for (let i = 0; i < tempGrid.length; i++) {
      tempGrid[i] = new Array(COLS);
    }

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        tempGrid[i][j] = '';
      }
    }

    setSourcePlaced(false);
    setTargetPlaced(false);

    setGrid(tempGrid.slice().slice());
  };

  return (
    <main>
      <Controls handlePlay={handlePlay} handleClear={handleClear} />
      <Grid grid={grid} handleMouseOverNode={handleMouseOverNode} />
    </main>
  );
}

export default App;

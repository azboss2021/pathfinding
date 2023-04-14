import { useEffect, useState } from 'react';
import Grid from './components/Grid';

function App() {
  const [grid, setGrid] = useState([]);
  const ROWS = 35;
  const COLS = 60;

  useEffect(() => {
    setupGrid();
  }, []);

  const setupGrid = () => {
    let tempGrid = new Array(ROWS);
    for (let i = 0; i < tempGrid.length; i++) {
      tempGrid[i] = new Array(COLS);
    }

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        tempGrid[i][j] = 'N';
      }
    }

    setGrid(tempGrid.slice().slice());
  };

  return (
    <main>
      <Grid grid={grid} />
    </main>
  );
}

export default App;

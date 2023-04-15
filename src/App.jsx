import { createContext, useState } from 'react';
import { useEffect } from 'react';
import Grid from './components/Grid';

const ROWS = 20;
const COLS = 30;

export const UserContext = createContext();

function App() {
  const [grid, setGrid] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [sourcePlaced, setSourcePlaced] = useState(false);
  const [targetPlaced, setTargetPlaced] = useState(false);

  useEffect(() => {
    resetGrid();
  }, []);

  const resetGrid = () => {
    const tempGrid = [];
    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLS; j++) {
        row.push(['']);
      }
      tempGrid.push(row);
    }
    setGrid(tempGrid);
  };

  const handleMouseDown = (node, row, col) => {
    const tempGrid = grid;
    setMouseDown(true);
    if (node == '') {
      if (!sourcePlaced) {
        tempGrid[row][col] = 'S';
        setSourcePlaced(true);
      } else if (!targetPlaced) {
        tempGrid[row][col] = 'T';
        setTargetPlaced(true);
      } else {
        tempGrid[row][col] = 'O';
      }
    }
    setGrid(tempGrid);
  };

  const handleMouseEnter = (node, row, col) => {
    if (!mouseDown) return;
  };

  return (
    <UserContext.Provider
      value={[grid, handleMouseDown, handleMouseEnter, setMouseDown]}
    >
      <main>
        <Grid />
      </main>
    </UserContext.Provider>
  );
}

export default App;

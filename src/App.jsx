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
  const [placingBlocks, setPlacingBlocks] = useState(true);

  useEffect(() => {
    resetGrid();
    document.body.onmousedown = () => setMouseDown(true);
    document.body.onmouseup = () => setMouseDown(false);
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
    if (node == '') {
      if (!sourcePlaced) {
        tempGrid[row][col] = 'S';
        setSourcePlaced(true);
        setPlacingBlocks(false);
      } else if (!targetPlaced) {
        tempGrid[row][col] = 'T';
        setTargetPlaced(true);
        setPlacingBlocks(false);
      } else {
        tempGrid[row][col] = 'O';
        setPlacingBlocks(true);
      }
    } else {
      if (node == 'S') {
        setSourcePlaced(false);
      } else if (node == 'T') {
        setTargetPlaced(false);
      } else if (node == 'O') {
        setPlacingBlocks(false);
      }
      tempGrid[row][col] = '';
    }
    setGrid(tempGrid);
  };

  const handleMouseEnter = (node, row, col) => {
    if (!mouseDown || node == 'S' || node == 'T') return;
    if (node == 'O' && !placingBlocks) {
      const tempGrid = grid.slice().slice();
      tempGrid[row][col] = '';
      setGrid(tempGrid);
    } else if (node == '' && placingBlocks) {
      const tempGrid = grid.slice().slice();
      tempGrid[row][col] = 'O';
      setGrid(tempGrid);
    }
  };

  return (
    <UserContext.Provider value={[grid, handleMouseDown, handleMouseEnter]}>
      <main>
        <Grid />
      </main>
    </UserContext.Provider>
  );
}

export default App;

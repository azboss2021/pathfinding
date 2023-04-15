import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';

const ROWS = 20;
const COLS = 30;

function App() {
  const [grid, setGrid] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [sourceCoords, setSourceCoords] = useState({ x: null, y: null });
  const [targetCoords, setTargetCoords] = useState({ x: null, y: null });
  const [placingBlocks, setPlacingBlocks] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    resetGrid();
    document.body.oncontextmenu = (e) => e.preventDefault();
    document.body.onmousedown = () => setMouseDown(true);
    document.body.onmouseup = () => setMouseDown(false);
  }, []);

  const Node = (y, x) => {
    return {
      state: '',
      x: x,
      y: y,
      fCost: null,
      gCost: null,
      hCost: null,
    };
  };

  const initializeStates = () => {
    setMouseDown(false);
    setSourceCoords({ x: null, y: null });
    setTargetCoords({ x: null, y: null });
    setPlacingBlocks(true);
    setIsRunning(false);
  };

  const resetGrid = () => {
    if (isRunning) return;
    initializeStates();
    const tempGrid = [];
    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLS; j++) {
        row.push(Node(i, j));
      }
      tempGrid.push(row);
    }
    setGrid(tempGrid);
  };

  const handleMouseDown = (node, row, col) => {
    if (isRunning) return;
    const tempGrid = grid;
    if (node == '') {
      if (sourceCoords.x == null) {
        tempGrid[row][col].state = 'S';
        setSourceCoords({ x: col, y: row });
        setPlacingBlocks(false);
      } else if (targetCoords.x == null) {
        tempGrid[row][col].state = 'T';
        setTargetCoords({ x: col, y: row });
        setPlacingBlocks(false);
      } else {
        tempGrid[row][col].state = 'O';
        setPlacingBlocks(true);
      }
    } else {
      if (node == 'S') {
        setSourceCoords({ x: null, y: null });
      } else if (node == 'T') {
        setTargetCoords({ x: null, y: null });
      } else if (node == 'O') {
        setPlacingBlocks(false);
      }
      tempGrid[row][col].state = '';
    }
    tempGrid[row][col].x = col;
    tempGrid[row][col].y = row;
    setGrid(tempGrid);
  };

  const handleMouseEnter = (node, row, col) => {
    if (!mouseDown || node == 'S' || node == 'T' || isRunning) return;
    if (node == 'O' && !placingBlocks) {
      const tempGrid = grid.slice().slice();
      tempGrid[row][col].state = '';
      tempGrid[row][col].x = col;
      tempGrid[row][col].y = row;
      setGrid(tempGrid);
    } else if (node == '' && placingBlocks) {
      const tempGrid = grid.slice().slice();
      tempGrid[row][col].state = 'O';
      tempGrid[row][col].x = col;
      tempGrid[row][col].y = row;
      setGrid(tempGrid);
    }
  };

  const distance = (x1, x2, y1, y2) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };

  const getChildren = (parent) => {
    const children = [];

    if (parent.y != 0 && grid[parent.y - 1][parent.x].state != 'O')
      children.push(grid[parent.y - 1][parent.x]);

    if (
      parent.y != 0 &&
      parent.x != COLS - 1 &&
      grid[parent.y - 1][parent.x + 1].state != 'O'
    )
      children.push(grid[parent.y - 1][parent.x + 1]);

    if (parent.x != COLS - 1 && grid[parent.y][parent.x + 1].state != 'O')
      children.push(grid[parent.y][parent.x + 1]);

    if (
      parent.y != ROWS - 1 &&
      parent.x != COLS - 1 &&
      grid[parent.y + 1][parent.x + 1].state != 'O'
    )
      children.push(grid[parent.y + 1][parent.x + 1]);

    if (parent.y != ROWS - 1 && grid[parent.y + 1][parent.x].state != 'O')
      children.push(grid[parent.y + 1][parent.x]);

    if (
      parent.y != ROWS - 1 &&
      parent.x != 0 &&
      grid[parent.y + 1][parent.x - 1].state != 'O'
    )
      children.push(grid[parent.y + 1][parent.x - 1]);

    if (parent.x != 0 && grid[parent.y][parent.x - 1].state != 'O')
      children.push(grid[parent.y][parent.x - 1]);

    if (
      parent.y != 0 &&
      parent.x != 0 &&
      grid[parent.y - 1][parent.x - 1].state != 'O'
    )
      children.push(grid[parent.y - 1][parent.x - 1]);

    return children;
  };

  const aStar = () => {
    if (sourceCoords.x == null || targetCoords.x == null || isRunning) return;
    console.log(getChildren(grid[sourceCoords.y][sourceCoords.x]));
    // const openList = [];
    // const closedList = [];
    // grid[sourceCoords.y][sourceCoords.x].fCost = 0;
    // openList.push(grid[sourceCoords.y][sourceCoords.x]);
    // while (openList.length > 0) {
    //   openList.sort((a, b) => (a.fCost > b.fCost ? -1 : 1));
    //   const curr = openList.pop();
    //   const children = getChildren(curr);
    // }
  };

  return (
    <main className="">
      <Controls aStar={aStar} resetGrid={resetGrid} />
      <Grid
        grid={grid}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        setMouseDown={setMouseDown}
      />
    </main>
  );
}

export default App;

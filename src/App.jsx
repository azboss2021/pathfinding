import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';

const ROWS = 25;
const COLS = 45;
const RANDOMPERC = 20;

function App() {
  const [grid, setGrid] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [sourceCoords, setSourceCoords] = useState({ x: null, y: null });
  const [targetCoords, setTargetCoords] = useState({ x: null, y: null });
  const [placingBlocks, setPlacingBlocks] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [justRan, setJustRan] = useState(false);

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
      fCost: Infinity,
      gCost: Infinity,
      cameFrom: {
        x: null,
        y: null,
      },
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
    tempGrid[parseInt(ROWS / 2)][parseInt((COLS * 1) / 4)].state = 'S';
    tempGrid[parseInt(ROWS / 2)][parseInt((COLS * 3) / 4)].state = 'T';
    setSourceCoords({ x: parseInt((COLS * 1) / 4), y: parseInt(ROWS / 2) });
    setTargetCoords({ x: parseInt((COLS * 3) / 4), y: parseInt(ROWS / 2) });
    setGrid(tempGrid);
  };

  const handleMouseDown = (node, row, col) => {
    if (isRunning) return;
    if (justRan) {
      clearPrev();
      setJustRan(false);
    }
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
    if (justRan) {
      clearPrev();
      setJustRan(false);
    }
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

  const manhattanDist = (x1, x2, y1, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  const euclideanDist = (x1, x2, y1, y2) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };

  const getNeighbors = (parent) => {
    const neighbors = [];

    if (parent.y != 0 && grid[parent.y - 1][parent.x].state != 'O')
      neighbors.push(grid[parent.y - 1][parent.x]);

    if (
      parent.y != 0 &&
      parent.x != COLS - 1 &&
      grid[parent.y - 1][parent.x + 1].state != 'O' &&
      grid[parent.y - 1][parent.x].state != 'O' &&
      grid[parent.y][parent.x + 1].state != 'O'
    )
      neighbors.push(grid[parent.y - 1][parent.x + 1]);

    if (parent.x != COLS - 1 && grid[parent.y][parent.x + 1].state != 'O')
      neighbors.push(grid[parent.y][parent.x + 1]);

    if (
      parent.y != ROWS - 1 &&
      parent.x != COLS - 1 &&
      grid[parent.y + 1][parent.x + 1].state != 'O' &&
      grid[parent.y + 1][parent.x].state != 'O' &&
      grid[parent.y][parent.x + 1].state != 'O'
    )
      neighbors.push(grid[parent.y + 1][parent.x + 1]);

    if (parent.y != ROWS - 1 && grid[parent.y + 1][parent.x].state != 'O')
      neighbors.push(grid[parent.y + 1][parent.x]);

    if (
      parent.y != ROWS - 1 &&
      parent.x != 0 &&
      grid[parent.y + 1][parent.x - 1].state != 'O' &&
      grid[parent.y + 1][parent.x].state != 'O' &&
      grid[parent.y][parent.x - 1].state != 'O'
    )
      neighbors.push(grid[parent.y + 1][parent.x - 1]);

    if (parent.x != 0 && grid[parent.y][parent.x - 1].state != 'O')
      neighbors.push(grid[parent.y][parent.x - 1]);

    if (
      parent.y != 0 &&
      parent.x != 0 &&
      grid[parent.y - 1][parent.x - 1].state != 'O' &&
      grid[parent.y][parent.x - 1].state != 'O' &&
      grid[parent.y - 1][parent.x].state != 'O'
    )
      neighbors.push(grid[parent.y - 1][parent.x - 1]);

    return neighbors;
  };

  const buildPath = (node) => {
    if (
      !node.cameFrom.x ||
      (node.cameFrom.x == sourceCoords.x && node.cameFrom.y == sourceCoords.y)
    )
      return;
    const interval = setInterval(() => {
      const tempGrid = grid.slice().slice();
      tempGrid[node.cameFrom.y][node.cameFrom.x].state = 'P';
      setGrid(tempGrid);
      node = tempGrid[node.cameFrom.y][node.cameFrom.x];

      if (
        !node.cameFrom.x ||
        (node.cameFrom.x == sourceCoords.x && node.cameFrom.y == sourceCoords.y)
      ) {
        clearInterval(interval);
        setIsRunning(false);
        setJustRan(true);
        return;
      }
    }, 50);
  };

  const randomizeObstacles = async () => {
    if (isRunning) return;
    setIsRunning(true);
    if (justRan) {
      clearPrev();
      setJustRan(false);
    }
    for (let i = 0; i < ROWS; i++) {
      const tempGrid = grid.slice().slice();
      for (let j = 0; j < COLS; j++) {
        if (tempGrid[i][j].state == '') {
          if (Math.random() * 100 < RANDOMPERC) {
            tempGrid[i][j].state = 'O';
          }
        }
      }
      setGrid(tempGrid);
      await new Promise((r) => setTimeout(r, 50));
    }
    setIsRunning(false);
  };

  const clearPrev = () => {
    const tempGrid = grid;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (
          tempGrid[i][j].state != 'S' &&
          tempGrid[i][j].state != 'T' &&
          tempGrid[i][j].state != 'O'
        ) {
          tempGrid[i][j].state = '';
          tempGrid[i][j].fCost = Infinity;
          tempGrid[i][j].gCost = Infinity;
          tempGrid[i][j].cameFrom = {
            x: null,
            y: null,
          };
        } else {
          tempGrid[i][j].fCost = Infinity;
          tempGrid[i][j].gCost = Infinity;
          tempGrid[i][j].cameFrom = {
            x: null,
            y: null,
          };
        }
      }
    }
    setGrid(tempGrid);
  };

  const aStar = () => {
    if (sourceCoords.x == null || targetCoords.x == null || isRunning) return;
    setIsRunning(true);
    clearPrev();
    const tempGrid = grid.slice().slice();
    const openList = [];
    tempGrid[sourceCoords.y][sourceCoords.x].fCost = manhattanDist(
      tempGrid[sourceCoords.y][sourceCoords.x].x,
      targetCoords.x,
      tempGrid[sourceCoords.y][sourceCoords.x].y,
      targetCoords.y
    );
    tempGrid[sourceCoords.y][sourceCoords.x].gCost = 0;
    openList.push(tempGrid[sourceCoords.y][sourceCoords.x]);

    const interval = setInterval(() => {
      const tempGrid = grid.slice().slice();
      openList.sort((a, b) => (a.fCost > b.fCost ? -1 : 1));
      const curr = openList[openList.length - 1];

      if (curr.x == targetCoords.x && curr.y == targetCoords.y) {
        buildPath(curr);
        clearInterval(interval);
        return;
      }

      openList.pop();

      if (curr.y != sourceCoords.y || curr.x != sourceCoords.x)
        tempGrid[curr.y][curr.x].state = 'L';

      const neighbors = getNeighbors(curr);
      for (let i = 0; i < neighbors.length; i++) {
        const tentativeGCost =
          curr.gCost +
          euclideanDist(curr.x, neighbors[i].x, curr.y, neighbors[i].y);

        if (tentativeGCost < neighbors[i].gCost) {
          tempGrid[neighbors[i].y][neighbors[i].x].cameFrom.x = curr.x;
          tempGrid[neighbors[i].y][neighbors[i].x].cameFrom.y = curr.y;
          neighbors[i].gCost = tentativeGCost;
          neighbors[i].fCost =
            tentativeGCost +
            manhattanDist(
              neighbors[i].x,
              targetCoords.x,
              neighbors[i].y,
              targetCoords.y
            );
          if (
            !openList.find(
              (node) => node.x == neighbors[i].x && node.y == neighbors[i].y
            )
          ) {
            openList.push(neighbors[i]);
            if (
              neighbors[i].y != targetCoords.y ||
              neighbors[i].x != targetCoords.x
            )
              tempGrid[neighbors[i].y][neighbors[i].x].state = 'N';
          }
        }
      }

      if (openList.length <= 0) {
        clearInterval(interval);
        setIsRunning(false);
        setJustRan(true);
        return;
      }
      setGrid(tempGrid);
    }, 10);
  };

  return (
    <main className="">
      <Controls
        aStar={aStar}
        resetGrid={resetGrid}
        randomizeObstacles={randomizeObstacles}
      />
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

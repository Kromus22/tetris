import { BLOCK_SIZE, COLUMNS, ROWS } from "../js/index.js";

export class View {
  constructor(container) {
    this.container = container;

    this.preview();
  }

  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');
  Colors = {
    J: 'Gold',
    I: 'RoyalBlue',
    O: 'Crimson',
    L: 'MediumSpringGreen',
    2: 'Indigo',
    T: 'Aqua',
    S: 'DeepPink',
  };

  preview() {
    this.container.textContent = '';
    const preview = document.createElement('div');
    preview.innerHTML = 'Press "ENTER" <br> to start';
    preview.style.cssText = `
      border: 3px solid black;
      font-size: 18px;
      text-align: center;
      padding: 50px;
      grid-column: 1 / 3;
    `;

    this.container.append(preview);
  }

  init() {
    this.container.textContent = '';
    this.canvas.style.gridArea = 'game';
    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = BLOCK_SIZE * COLUMNS;
    this.canvas.height = BLOCK_SIZE * ROWS;
  }

  createBlockScore() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
      border: 2px solid black;
      font-size: 18px;
      text-align: center;
      padding: 20px;
      grid-area: score;
    `;

    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

    this.container.append(scoreBlock);

    return (lines, score, level, record) => {
      linesElem.textContent = `lines: ${lines}`;
      scoreElem.textContent = `score: ${score}`;
      levelElem.textContent = `level: ${level}`;
      recordElem.textContent = `record: ${record}`;
    }
  }

  createBlockNextTetramino() {
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
      width: ${BLOCK_SIZE * 4}px;
      height: ${BLOCK_SIZE * 4}px;
      border: 2px solid black;
      padding: 10px;
      grid-area: next;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    tetraminoBlock.append(canvas);

    this.container.append(tetraminoBlock);

    return (tetramino) => {
      canvas.width = BLOCK_SIZE * tetramino.length;
      canvas.height = BLOCK_SIZE * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const block = line[x];

          if (block !== 'o') {
            context.fillStyle = this.Colors[block];
            context.strokeStyle = 'white';
            context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
    }
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block !== 'o') {
          this.context.fillStyle = this.Colors[block];
          this.context.strokeStyle = 'white';
          this.context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          this.context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  };
}
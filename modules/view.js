import { BLOCK_SIZE, COLUMNS, ROWS } from "../js/index.js";

export class View {
  constructor(container) {
    this.container = container;

    this.preview();
  }

  canvas = document.createElement('canvas');
  alert = document.createElement('div');

  Colors = {
    J: 'Gold',
    I: 'RoyalBlue',
    O: 'Crimson',
    L: 'MediumSpringGreen',
    2: 'Indigo',
    T: 'Aqua',
    S: 'DeepPink',
  };

  context = this.canvas.getContext('2d');

  init() {
    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = BLOCK_SIZE * COLUMNS;
    this.canvas.height = BLOCK_SIZE * ROWS;
  }

  preview() {
    this.alert.textContent = 'Please press ENTER to start the game';
    this.container.append(this.alert);

    window.addEventListener('keydown', () => {
      if ('Enter') {
        this.alert.remove();
      }
    })
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
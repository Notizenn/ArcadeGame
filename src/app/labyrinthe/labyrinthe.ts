import { Component, HostListener, OnInit } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';

type Cell = '#' | ' ' | 'S' | 'E';

@Component({
  selector: 'app-labyrinthe',
  standalone: true,
  templateUrl: './labyrinthe.html',
  styleUrls: ['./labyrinthe.css'],
  imports: [NgFor, NgClass, CommonModule],
})
export class LabyrintheComponent implements OnInit {

  maze: Cell[][] = [];
  playerRow = 1;
  playerCol = 1;

  startRow = 1;
  startCol = 1;

  exitRow = 1;
  exitCol = 1;

  win = false;
  moves = 0;

  // difficulté / taille
  difficulty: 'easy' | 'medium' | 'hard' = 'easy';
  size = 9; // 9, 15, 21 ...

  ngOnInit(): void {
    this.applyDifficulty('easy');
  }

  // ==========================
  //  GESTION CLAVIER
  // ==========================

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (this.win) return;


    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowUp':
        this.move(-1, 0);
        break;
      case 'ArrowDown':
        this.move(1, 0);
        break;
      case 'ArrowLeft':
        this.move(0, -1);
        break
      case 'ArrowRight':
        this.move(0, 1);
        break
      case 'w':
        this.move(-1, 0);
        break;
      case 's':
        this.move(1, 0);
        break;
      case 'a':
        this.move(0, -1);
        break;
      case 'd':
        this.move(0, 1);
        break;
    }
  }


  move(dr: number, dc: number) {
    if (!this.maze.length || this.win) return;

    const nr = this.playerRow + dr;
    const nc = this.playerCol + dc;

    if (
      nr < 0 || nr >= this.maze.length ||
      nc < 0 || nc >= this.maze[0].length
    ) {
      return;
    }

    const cell = this.maze[nr][nc];
    if (cell === '#') return; // mur

    this.playerRow = nr;
    this.playerCol = nc;
    this.moves++;

    if (nr === this.exitRow && nc === this.exitCol) {
      this.win = true;
    }
  }

  // ==========================
  //   DIFFICULTÉ / RESET
  // ==========================

  applyDifficulty(diff: 'easy' | 'medium' | 'hard') {
    this.difficulty = diff;
    this.size = diff === 'easy' ? 9 : diff === 'medium' ? 15 : 21;

    this.generateMaze(this.size);
    this.resetPlayer();
  }

  reset() {
    // reset avec nouvelle génération (labyrinthe différent)
    this.generateMaze(this.size);
    this.resetPlayer();
  }

  private resetPlayer() {
    this.playerRow = this.startRow;
    this.playerCol = this.startCol;
    this.moves = 0;
    this.win = false;
  }

  // ==========================
  //    GÉNÉRATION DE MAZE
  // ==========================

  private generateMaze(size: number) {
    // taille impaire >= 5
    if (size < 5) size = 5;
    if (size % 2 === 0) size += 1;

    const maze: Cell[][] = Array.from({ length: size }, () =>
      Array<Cell>(size).fill('#')
    );

    const carve = (r: number, c: number) => {
      maze[r][c] = ' ';
      const dirs: [number, number][] = [
        [-2, 0],
        [2, 0],
        [0, -2],
        [0, 2],
      ];
      // shuffle
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr > 0 && nr < size - 1 &&
          nc > 0 && nc < size - 1 &&
          maze[nr][nc] === '#'
        ) {
          // casse le mur au milieu
          maze[r + dr / 2][c + dc / 2] = ' ';
          carve(nr, nc);
        }
      }
    };

    // on part du coin haut gauche intérieur
    carve(1, 1);

    // départ + sortie
    maze[1][1] = 'S';
    maze[size - 2][size - 2] = 'E';

    this.maze = maze;
    this.startRow = 1;
    this.startCol = 1;
    this.exitRow = size - 2;
    this.exitCol = size - 2;
  }

  isPlayer(r: number, c: number): boolean {
    return r === this.playerRow && c === this.playerCol;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Card = {
  id: number,
  name: string,
  flip: boolean,
  find: boolean
};

const EMOJI_POOL = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🦄', '🐔', '🦆', '🦉', '🐺',
  '🦓', '🦒', '🐴', '🐢', '🐙', '🦀', '🦜', '🦚', '🦥', '🦘'
];

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './memory.html',
  styleUrls: ['./memory.css']
})
export class MemoryComponent implements OnInit {

  cards: Card[] = [];
  selectedIdx: number[] = [];
  lockBoard = false;
  win = false;

  currentPlayer: 1 | 2 = 1;
  scores = { 1: 0, 2: 0 };

  players = { 1: 'Player 1', 2: 'Player 2' };

  private closeTimer: any = null;

  ngOnInit(): void { this.reset(); }

  private pickRandomEmojis(n: number): string[] {
    const pool = [...EMOJI_POOL];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, n);
  }

  reset() {
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }

    const values = this.pickRandomEmojis(8);
    const deck: Card[] = [];
    let id = 1;
    for (const v of values) {
      deck.push({ id: id++, name: v, flip: false, find: false });
      deck.push({ id: id++, name: v, flip: false, find: false });
    }
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.cards = deck;
    this.selectedIdx = [];
    this.lockBoard = false;
    this.win = false;
    this.currentPlayer = 1;
    this.scores = { 1: 0, 2: 0 };
  }

  private checkWin() {
    this.win = this.cards.length > 0 && this.cards.every(c => c.find);
  }

  private switchTurn() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  flip(i: number) {
    if (this.lockBoard) return;
    const c = this.cards[i];
    if (c.flip || c.find) return;

    c.flip = true;
    this.selectedIdx.push(i);
    this.cards = [...this.cards];

    if (this.selectedIdx.length === 2) {
      this.lockBoard = true;
      const [aIdx, bIdx] = this.selectedIdx;
      const a = this.cards[aIdx];
      const b = this.cards[bIdx];

      if (a.name === b.name) {
        a.find = true;
        b.find = true;
        this.scores[this.currentPlayer] += 1;
        this.selectedIdx = [];
        this.lockBoard = false;
        this.cards = [...this.cards];
        this.checkWin();
      } else {
        this.closeTimer = setTimeout(() => {
          this.cards[aIdx].flip = false;
          this.cards[bIdx].flip = false;
          this.selectedIdx = [];
          this.lockBoard = false;
          this.cards = [...this.cards];
          this.closeTimer = null;
          this.switchTurn();
        }, 2000);
      }
    }
  }

  get winnerText(): string {
    if (!this.win) return '';
    const s1 = this.scores[1], s2 = this.scores[2];
    if (s1 > s2) return `${this.players[1]} won !`;
    if (s2 > s1) return `${this.players[2]} won !`;
    return 'Draw !';
  }
}

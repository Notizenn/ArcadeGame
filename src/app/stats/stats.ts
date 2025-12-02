import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StatsService } from './stats.service';
import { ArcadeStats } from './game-stats.model';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.html',
  styleUrls: ['./stats.css'],
  imports: [CommonModule],
})
export class StatsComponent implements OnInit, OnDestroy {
  stats!: ArcadeStats;
  sub!: Subscription;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.sub = this.statsService.stats$.subscribe((s) => (this.stats = s));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  reset(): void {
    this.statsService.resetStats();
  }
}

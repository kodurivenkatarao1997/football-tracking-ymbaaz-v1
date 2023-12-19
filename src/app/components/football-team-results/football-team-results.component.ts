import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FootballService } from '../../services/football.service';
import {
  FootballTeamFixture,
  TeamFixturesData,
} from '../../interfaces/fixtures';
import { TeamLeague } from '../../interfaces/team-league';

@Component({
  selector: 'app-football-team-results',
  templateUrl: './football-team-results.component.html',
  styleUrls: ['./football-team-results.component.css'],
})
export class FootballTeamResultsComponent implements OnInit, OnDestroy {
  footballTeamData: FootballTeamFixture[] = [];
  getTeamId: string = '';
  isLoading: boolean = false;
  subscriptions: Subscription = new Subscription();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly footballService: FootballService
  ) {}

  ngOnInit(): void {
    this.getTeamId = this.route.snapshot.paramMap.get('teamId');
    const league: TeamLeague =
      JSON.parse(localStorage.getItem('leagueData')!) || [];
    this.getFixtures(this.getTeamId, league.league.id);
  }

  backToFootballUpdates(): void {
    this.router.navigate(['/']);
  }

  getFixtures(id: string, leagueId: number): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.footballService
        .getFixtures(id, leagueId)
        .subscribe((res: TeamFixturesData) => {
          this.footballTeamData = res.response;
          this.isLoading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FootballService } from '../../services/football.service';
import { TeamLeague, TeamLeagueInfo } from '../../interfaces/team-league';
import { TeamStandingsInfo, TeamStnding } from '../../interfaces/standings';
import { LEAGUES_LIST } from '../../constants/game-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  teamLeaguesList: TeamLeague[] = [];
  standingsData: TeamStnding[] = [];
  selectedTeamId: number;
  isLoading: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly footballService: FootballService
  ) {}

  ngOnInit(): void {
    this.getLeaguesData();
  }

  getStandings(leagueInfo: TeamLeague): void {
    this.isLoading = true;
    this.selectedTeamId = leagueInfo?.league?.id;
    localStorage.setItem('leagueData', JSON.stringify(leagueInfo));
    this.subscriptions.add(
      this.footballService
        .getStandings(leagueInfo)
        .pipe(
          tap((res: TeamStandingsInfo) => {
            this.standingsData = res.response;
            this.isLoading = false;
          })
        )
        .subscribe()
    );
  }

  naviagteToFootballTeamResults(id: number): void {
    this.router.navigate(['football-team-results', id]);
  }

  getLeaguesData(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.footballService
        .getLeaguesData()
        .pipe(
          tap((res: TeamLeagueInfo) => {
            this.isLoading = false;
            if (res?.response?.length) {
              this.teamLeaguesList = res.response.filter(
                (leagueInfo: TeamLeague) => {
                  const leagueData = LEAGUES_LIST.find(
                    (element: number) => element === leagueInfo.league.id
                  );
                  return leagueData === leagueInfo.league.id;
                }
              );
              const getLeague: TeamLeague =
                JSON.parse(localStorage.getItem('leagueData')!) ||
                this.teamLeaguesList[0];
              this.getStandings(getLeague);
            }
          }),
          catchError((err) => {
            this.isLoading = false;
            return err;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

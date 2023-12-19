import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPrefixUrl } from '../constants/game-constants';
import { TeamFixturesData } from '../interfaces/fixtures';
import { TeamStandingsInfo } from '../interfaces/standings';
import { TeamLeague, TeamLeagueInfo } from '../interfaces/team-league';

@Injectable()
export class FootballService {
  constructor(private http: HttpClient) {}

  getFixtures(teamId: string, leagueId: number): Observable<TeamFixturesData> {
    const date = new Date();
    const year = date.getFullYear();
    const gameStatus = 'FT';
    return this.http.get<TeamFixturesData>(
      `${ApiPrefixUrl}fixtures?team=${teamId}&league=${leagueId}&last=10&status=${gameStatus}&season=${year}`,
      {
        headers: this.setHttpHeaders(),
      }
    );
  }

  getLeaguesData(): Observable<TeamLeagueInfo> {
    return this.http.get<TeamLeagueInfo>(`${ApiPrefixUrl}leagues`, {
      headers: this.setHttpHeaders(),
    });
  }

  getStandings(leagueInfo: TeamLeague): Observable<TeamStandingsInfo> {
    const d = new Date();
    const year = d.getFullYear();
    return this.http.get<TeamStandingsInfo>(
      `${ApiPrefixUrl}standings?league=${leagueInfo?.league?.id}&season=${year}`,
      {
        headers: this.setHttpHeaders(),
      }
    );
  }

  setHttpHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', '96065ab40fb12af77d841372ee0bcb3d');
    return httpHeaders;
  }
}

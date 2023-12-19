import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballTeamResultsComponent } from './components/football-team-results/football-team-results.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'football-team-results/:teamId',
    component: FootballTeamResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

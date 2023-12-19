import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FootballService } from './services/football.service';
import { FootballTeamResultsComponent } from './components/football-team-results/football-team-results.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, HomeComponent, FootballTeamResultsComponent],
  providers: [FootballService],
  bootstrap: [AppComponent],
})
export class AppModule {}

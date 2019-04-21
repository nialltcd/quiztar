import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
const routes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

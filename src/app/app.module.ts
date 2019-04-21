import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { QuestionsComponent } from './questions/questions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FirebaseService } from './firebase.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    NavbarComponent,
    ScoreboardComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    //AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

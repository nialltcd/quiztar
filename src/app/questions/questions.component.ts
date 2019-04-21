import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions_: Observable<any[]>;
  public questions: any[];
  constructor(private db: AngularFirestore) {
    db.collection('/questions').valueChanges()
    .subscribe(
      data => {
        var result = [];
        for (let each of data){
          console.log(each);
          for (var property in each) {
            if (each.hasOwnProperty(property)) {
                if(property != "week")
                  result.push(each[property])
            }
          }
        }
        this.questions = result;
      }
    );
   }

  ngOnInit() {
    //this.questions = this.getQuestions('/questions');
  }
  getQuestions(path) {
      //Do something
  
    //this.items = db.collection('/items').valueChanges();

    //return this.firebaseService.getQuestions(path);
  }

}

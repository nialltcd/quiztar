import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath = '/questions';

  constructor(private db: AngularFireDatabase) { }

  getQuestions(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

}

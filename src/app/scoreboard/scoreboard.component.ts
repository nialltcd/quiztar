import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  public rankings: any[];

  public results: Observable<any[]>;
  private _db;
  constructor(private db: AngularFirestore) {
      this._db = db;
   }

   ngOnInit() {
    this.getResults();
  }

  

  getResults() {
    this._db.collection('/answers').valueChanges()
    .subscribe(
      answers => {
        
        var scoreboard = {};

        this._db.collection('/guesses').valueChanges().subscribe(guesses=>
          {
            var ranks = {};

            for (let answer of answers)
            { 
              console.log(answers)
              answer["total"] = 0
              for(var a in answer)
              {
                if (answer.hasOwnProperty(a))
                  if(a != "week" && a != "total")
                  {
                    answer["total"] += parseInt(answer[a])
                  }
              }
              

              var week = answer["week"];
              var weeklyScoreboad = {}

              
              for (let guess of guesses)
              {
                if (!(guess["player"] in ranks))
                  ranks[guess["player"]] = { "player": guess["player"], "points": 0, "wins": 0, "correct": 0 }
                if (!(guess["player"] in weeklyScoreboad))
                  weeklyScoreboad[guess["player"]] = { "total":0, "week":answer["week"],"wins": 0, "points": 0, "correct": 0}
                            
                if(week == guess["week"])
                {
                  for (var prop in guess)
                  {
                    if (answer.hasOwnProperty(prop))
                    {
                      if (prop != "week")
                      {
                        if (answer[prop] == guess[prop])
                        {
                            weeklyScoreboad[guess["player"]]["points"] = weeklyScoreboad[guess["player"]]["points"]+1;
                            ranks[guess["player"]] ["points"]= ranks[guess["player"]]["points"] +1;
                            weeklyScoreboad[guess["player"]]["correct"] = weeklyScoreboad[guess["player"]]["correct"]+1;
                            ranks[guess["player"]] ["correct"]= ranks[guess["player"]]["correct"] +1;

                        }
                        weeklyScoreboad[guess["player"]]["total"] = parseInt(weeklyScoreboad[guess["player"]]["total"])+parseInt(guess[prop]);
                      }     
                    }
                  }
                }
              } 
              var winner_diff = 999999999;
              var winners = []
              console.log(weeklyScoreboad)
              console.log(answer)
              for (var key in weeklyScoreboad) {
                if (weeklyScoreboad.hasOwnProperty(key)) {
                  console.log("CURRENT winners: " + winners)
                  console.log("Actual answer: " + answer["total"])
                  console.log("Best answer: " + winner_diff)
                  console.log("CURRENT person: " + key)
                  console.log("CURRENT answer: " +  weeklyScoreboad[key]["total"])
                  if (winners === undefined || winners.length == 0)
                    {

                      console.log(key)
                      winners.push(key) 
                       
                      winner_diff = Math.abs(weeklyScoreboad[key]["total"] - answer["total"])
                      weeklyScoreboad[key]["points"] += 5
                      weeklyScoreboad[key]["wins"] += 1
                      ranks[key] ["points"] += +5;
                      ranks[key] ["wins"] += +1;
                    }
                    else
                      {
                        var difference = Math.abs(weeklyScoreboad[key]["total"] - answer["total"])
                        console.log("CURRENT answer: " + difference)

                        if( difference < winner_diff )
                        {
                          for(var i=0; i< winners.length;i++)
                          {
                            console.log(winners[i])
                            console.log(winners)
                            weeklyScoreboad[winners[i]]["points"] -= 5
                            weeklyScoreboad[winners[i]]["wins"] -= 1
                            ranks[winners[i]] ["points"] -= 5;
                            ranks[winners[i]] ["wins"] -= 1;
                          }
                          ranks[key] ["points"] += 5;
                          ranks[key] ["wins"] += 1;
                          weeklyScoreboad[key]["points"] += 5
                          weeklyScoreboad[key]["wins"] += 1
                         
                          winners = [key]  
                          winner_diff = difference
                          console.log(winners)
                          console.log(winner_diff)
                        }
                        else if(difference === winner_diff)
                        {
                          console.log ("EQUAL")
                          winners.push(key)
                          ranks[key] ["points"] += 5;
                          ranks[key] ["wins"] +=1;

                          weeklyScoreboad[key]["points"] += 5
                          weeklyScoreboad[key]["wins"] += 1
                        }
                      }
                    
                }
              }
              scoreboard[answer["week"]] = weeklyScoreboad
            }
            var arr = [];
            console.log(ranks)

            for (var key in ranks) {
                if (ranks.hasOwnProperty(key)) {
                    arr.push(ranks[key]);
                }
            }
            console.log(ranks)
            arr.sort((a, b) => (a.points < b.points) ? 1 : -1)
            this.rankings = arr
          });

        }
      );
    }
}

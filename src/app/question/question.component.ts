import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import {interval} from 'rxjs'
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name:string='';
  public questionlist:any= [];
  public cquestion:number = 0;
  public points:number = 0;
  counter = 60;
  correct:number=0;
  incorrect:number=0;
  intervals:any;
  progress:string='0';
  isQuizeCompleted:boolean=false;
  constructor(private QuestionService : ServicesService ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestion();
    this.startCounter();
  }
  getAllQuestion(){
    this.QuestionService.getQuestionjson()
    .subscribe(res=>{
     this.questionlist = res.questions
    })
  }
  isNext(){
     this.cquestion++;
  }
  ispre(){
    this.cquestion--;
  }
  answere(cq:number, option:any){
    if(cq === this.questionlist.length){
      this.isQuizeCompleted = true;
      this.stopCounter();
    }
    if(option.correct){
      this.points += 10;
      this.correct++;
      setTimeout(() => {
        this.cquestion++;
        this.resetCounter();
        this.getprogressPercent();
      }, 1000);
    }
    else{
      setTimeout(() => {
        this.cquestion++;
      this.incorrect++;
      this.resetCounter();
      this.getprogressPercent();
      }, 1000);
      this.points -= 10;
    }
  }
  startCounter(){
    this.intervals = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter === 0){
        this.cquestion++;
        this.counter = 60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.intervals.unsubscribe();
    }, 60);
  }
  stopCounter(){
    this.intervals.unsubscribe();
    this.counter= 0;
  }
  resetCounter(){
    this.startCounter();
    this.counter= 60;
    this.startCounter();
  }
  resetQuize(){
    this.resetCounter();
    this.getAllQuestion();
    this.points=0;
    this.counter=60;
    this.cquestion=0;
    this.progress = '0';
  }
  getprogressPercent(){
    this.progress = ((this.cquestion/this.questionlist.length)*100).toString();
    return this.progress;
  }
}

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name')bnamekey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  startQuize(){
    localStorage.setItem("name" , this.bnamekey.nativeElement.value);
  }

}

import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { PomodoroComponent } from "../pomodoro/pomodoro.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild(PomodoroComponent) child;

  hours = 0;
  minutes = 0;
  seconds = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  receiveMessage($event) {
    if ($event === -1) {
      this.resetTimer();
    } else {
      if (this.seconds === 59) {
        this.seconds = 0;
        if (this.minutes === 59) {
          this.minutes = 0;
          this.hours++;
        } else {
          this.minutes++;
        }
      } else {
        this.seconds++;
      }
    }
  }

  resetTimer() {
    this.seconds = this.minutes = this.hours = 0;
  }
}

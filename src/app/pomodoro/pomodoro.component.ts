import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pomodoro",
  templateUrl: "./pomodoro.component.html",
  styleUrls: ["./pomodoro.component.css"]
})
export class PomodoroComponent implements OnInit {
  // settings
  workTime = 25;
  breakTime = 5;

  // current time
  minutes: number;
  seconds: number;
  totalTime: number;
  currentTime = 0;

  // session parameters
  currentSession: string;
  fillColor: string;
  fillHeight: string;
  isPaused: boolean;

  isFirstSession = true;
  muteSound = false;

  @Output() messageEvent = new EventEmitter<number>();

  constructor() {
    this.currentSession = "WORK";
    this.resetPomodoro();
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit() {}

  private tick(): void {
    if (!this.isPaused) {
      if (this.seconds > 0) {
        this.seconds--;
        this.currentTime++;
        this.calcHeight();
        this.sendMessage();
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
        this.sendMessage();
      } else {
        if (this.currentSession === "BREAK") {
          this.goToWork();
          this.calcHeight();
        } else {
          this.goToBreak();
          this.calcHeight();
        }
        this.playAudio(this.currentSession.toLowerCase());
      }
    }
  }

  calcHeight(): void {
    this.fillHeight = (this.currentTime / this.totalTime) * 100 + "%";
  }

  goToBreak(): void {
    this.currentSession = "BREAK";
    this.fillColor = "#E88B8B";
    this.minutes = this.breakTime;
    this.seconds = 0;
    this.totalTime = 60 * this.breakTime;
    this.currentTime = 0;
  }

  goToWork(): void {
    this.currentSession = "WORK";
    this.fillColor = "#7DE891";
    this.minutes = this.workTime;
    this.seconds = 0;
    this.totalTime = 60 * this.workTime;
    this.currentTime = 0;
  }

  resetPomodoro(): void {
    this.isPaused = true;
    this.currentTime = 0;
    this.calcHeight();
    this.goToWork();
    // this.resetNavbarTimer();
  }

  public togglePomodoro(): void {
    if (this.isFirstSession) {
      this.resetPomodoro();
      this.isFirstSession = !this.isFirstSession;
    }
    this.isPaused = !this.isPaused;
  }

  setWorkTime(value): void {
    if (!(value < 0 && this.workTime === 1)) {
      this.workTime += value;
    }
  }

  setBreakTime(value): void {
    if (!(value < 0 && this.breakTime === 1)) {
      this.breakTime += value;
    }
  }

  playAudio(sessionName: string): void {
    if (!this.muteSound) {
      const audio = new Audio();
      audio.src = "../../assets/sounds/" + sessionName + ".mp3";
      audio.load();
      audio.play();
    }
  }

  toggleSound() {
    this.muteSound = !this.muteSound;
  }

  sendMessage() {
    this.messageEvent.emit(this.currentTime);
  }

  resetNavbarTimer() {
    this.messageEvent.emit(-1);
  }
}

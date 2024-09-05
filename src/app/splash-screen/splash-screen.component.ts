import { Component, OnInit } from "@angular/core";

@Component({
  selector: "splash-screen",
  templateUrl: "./splash-screen.component.html",
  styleUrls: ["./splash-screen.component.css"]
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string | undefined;
  showSplash = true;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.windowWidth = "-" + window.innerWidth + "px";

    //   setTimeout(() => {
    //     this.showSplash = !this.showSplash;
    //   }, 500);
    // }, 3000);
    console.log('Wait! You\'re Being Getting Verified Before Accessing This Site')
  }

}
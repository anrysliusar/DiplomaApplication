import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isDemoChosen: boolean;
  items: MenuItem[] =
    [
      {
        label: 'Create Project',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/projects',
        command: () => {this.isDemoChosen = false}
      },
      {
        label: 'Create Presentation',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/projects',
        command: () => {this.isDemoChosen = false}
      },
      {
        label: 'Configure Slides',
        icon: 'pi pi-fw pi-images',
        routerLink: '/projects',
        command: () => {this.isDemoChosen = false}
      },
      {
        label: 'Start using Hand Gesture Recognition and tracking system for controlling your presentation',
        icon: 'pi pi-fw pi-video',
        command: () => {this.isDemoChosen = true}
      }
    ];

  constructor() {

  }

  ngOnInit(): void {
  }

}

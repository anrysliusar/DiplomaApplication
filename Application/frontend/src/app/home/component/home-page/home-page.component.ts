import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthStoreService} from "../../../security/service/store/auth-store.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  constructor(private authService: AuthStoreService) {

  }

  ngOnInit(): void {
  }


}

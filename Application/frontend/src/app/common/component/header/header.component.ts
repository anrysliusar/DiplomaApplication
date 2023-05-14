import {Component, Input, OnInit} from '@angular/core';
import {AuthStoreService} from "../../../security/service/store/auth-store.service";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[];
  isAuthenticated: boolean;


  constructor(private authService: AuthStoreService,
              private router: Router) {
    this.authService.authIsAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnInit(): void {
    this.configMenu();
  }

  logout() {
    this.authService.logout();
  }

  private configMenu() {
    const initialItems = [
      {label: 'Home', routerLink: '/home'},
      {label: 'About', routerLink: '/about'}
    ];
    if (this.isAuthenticated) {
      this.menuItems = [
        ...initialItems,
        {label: 'Projects', routerLink: '/projects'}
      ]
    } else {
      this.menuItems = initialItems;
    }
  }

  login() {
    this.router.navigate(['/login']);
  }
}

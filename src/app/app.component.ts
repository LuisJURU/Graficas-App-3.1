import { Component} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { DataModifierComponent } from './datos/data-modifier.component';
import { FormsModule } from '@angular/forms';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, CommonModule, RouterOutlet, DataModifierComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp3.0';
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private authService: AuthService, private router: Router) {}

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

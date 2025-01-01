import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,UserListComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isProfileMenuOpen = false;
  isSidebarCollapsed = false;
  isNotifOpen = false;
  router=inject(Router)
  FakeNotifs = [
    {
      id: 1,
      title: 'New order received',
      description: 'John has placed a new order for a bike',
      createdAt: new Date('2022-01-01T10:00:00'),
    },
    {
      id: 2,
      title: 'Order completed',
      description: 'John has completed his order for a bike',
      createdAt: new Date('2022-01-02T12:00:00'),
    }
  ];

  toggleNotif() {
    this.isNotifOpen = !this.isNotifOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onClickOutside(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (
      !clickedElement.closest('.profile-image') &&
      !clickedElement.closest('.profile-dropdown')
    ) {
      this.isProfileMenuOpen = false;
    }

    if (
      !clickedElement.closest('.icon.notification-icon') &&
      !clickedElement.closest('.notification-dropdown')
    ) {
      this.isNotifOpen = false;
    }
  }

  logout() {  
    this.router.navigate(['landing-page']);
  }
}

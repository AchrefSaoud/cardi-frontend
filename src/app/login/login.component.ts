import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed typo
})
export class LoginComponent {
  currentTab: 'login' | 'register' = 'login';

  loginData = {
    username: '',
    password: '',
  };

  registerData = {
    username: '',
    password: '',
    confirmPassword:''
  };

  constructor(private toastr: ToastrService, private authService: AuthService,private router:Router) {}

  switchTab(tab: 'login' | 'register'): void {
    this.currentTab = tab;
  }

  handleLogin(): void {
    if (!this.loginData.username || !this.loginData.password) {
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token',response.token);
        this.toastr.success('Login successful!','',{
          timeOut: 1000,
        });
        this.router.navigate(['home']);
        
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Login failed', 'Error');
      },
    });
  }

  handleRegister(): void {
    const { username, password, confirmPassword } = this.registerData;

    if (!username || !password || !confirmPassword) {
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }

    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    this.authService.register({username,password}).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful!', 'Success');
        this.switchTab('login'); 
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Registration failed', 'Error');
      },
    });
  }
}

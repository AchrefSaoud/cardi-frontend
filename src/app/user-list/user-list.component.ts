import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', history: ['Login', 'Purchase'] },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', history: ['Profile Update'] }
  ];
  filteredUsers = [...this.users];
  searchTerm = '';
  isModalOpen = false;
  modalTitle = '';
  modalMode: 'view' | 'create' = 'view';
  selectedUser: any = null;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(mode: 'view' | 'create', user: any = null) {
    this.isModalOpen = true;
    this.modalMode = mode;
    this.modalTitle = mode === 'view' ? 'User Details' : 'Create New User';
    this.selectedUser = user;
  }

  closeModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = false;
  }

  createUser() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.users.push({ ...newUser, history: [] });
      this.filterUsers();
      this.userForm.reset();
      this.isModalOpen = false;
    }
  }
}

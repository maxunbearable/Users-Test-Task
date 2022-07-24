import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from "./services/users.service";
import { takeWhile } from "rxjs";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  users = [];
  alive = true;
  isDeleted = false;
  isEdited = false;
  editMode = false;
  createMode = false;
  isCreated = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder) {}

  editForm = this.formBuilder.group({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      emailVerified: false,
      createDate: ''
  });

  ngOnInit(): void {
    this.updateUsers();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  updateUsers(): void {
    this.usersService.getUsers().pipe(takeWhile(() => this.alive)).subscribe((users: any) => this.users = users);
  }

  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id).pipe(takeWhile(() => this.alive)).subscribe(() => {});
    this.isDeleted = true;
    setTimeout(() => {
      this.isDeleted = false;
    }, 5000);
    this.updateUsers();
  }

  onEditSaveClick(id: number): void {
    this.usersService.editUser(id, this.editForm.value).pipe(takeWhile(() => this.alive)).subscribe(() => {});
    this.editMode = false;
    this.isEdited = true;
    setTimeout(() => {
      this.isEdited = false;
    }, 5000);
    this.updateUsers();
  }

  onCreateSaveClick(): void {
    this.usersService.createUser((this.editForm.get('id')?.value || 0), this.editForm.value)
      .pipe(takeWhile(() => this.alive)).subscribe(() => {});
    this.createMode = false;
    this.isCreated = true;
    setTimeout(() => {
      this.isCreated = false;
    }, 5000);
    this.updateUsers();
  }
}

import { Component, TemplateRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup} from '@angular/forms';
import { addUser, Users } from './model/users';
import { UsersService } from './services/users.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


users: Users[] = [];
addNewUser: addUser[] = [];
editedUser: addUser[] = [];
processingUsers: boolean = false;

constructor(private modalService: NgbModal, private usersService: UsersService, private notifierService: NotifierService) {}

ngOnInit(): void {
  this.getUsers();
}

userForm = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  username: new FormControl('', Validators.required),
})

clearForm(){
  this.userForm.reset();
}

getUsers() {
  this.processingUsers = true;
  this.usersService.getUsers().subscribe({
    next: (v) => {
      this.processingUsers = false;
      this.users = v;
    },
    error: (e) => {
      this.notifierService.notify("error", "Error fetching Users!");
      this.processingUsers = false;
    }
  })
}

deleteUser(userId: number) {
  this.usersService.deleteUser(userId).subscribe({
    next: (v) => {
      this.notifierService.notify("success", "This user was deleted successfully!")
    },
    error: (error) => {
      console.error("error", "User cannot be deleted!" )
    }
  })
}



onEditSubmit(userForm: FormGroup, userId: number){
  this.editedUser = userForm.value;
  console.log(this.editedUser);
  this.editUser(userId, this.editedUser);
}

editUser(userId: number, editedUser: addUser[]) {
  this.usersService.editUser(userId, editedUser).subscribe({
    next: (v) => {
      console.log("User updated: ", v);
      this.notifierService.notify("success", "This user had been updated!")
      this.clearForm();
  },
  error: (e) => {
    console.log(e);
  }
})
}

onSubmit(userForm: FormGroup){
  this.addNewUser = userForm.value;
  this.submitUserForm(this.addNewUser);
}

submitUserForm(addNewUser: addUser[]) {
  this.usersService.addNewUser(addNewUser).subscribe({
    next: (v) => {
      // TODO: Add Notifier Service
      console.log("User added successfully", v);
      this.notifierService.notify("success", "User added successfully!");
      this.clearForm();
    },
    error: (e) => {
      console.log(e);
    }
  });
}

openModal(content: any){
  this.modalService.open(content);
  this.clearForm();
}

openEditModal(editUserModal: TemplateRef<any>, user: number) {
  this.modalService.open(editUserModal);
  console.log(user);
}

closeModal(){
  this.modalService.dismissAll();
}

}

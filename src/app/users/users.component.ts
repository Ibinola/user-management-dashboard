import { Component, TemplateRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup} from '@angular/forms';
import { addUser, Users } from './model/users';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


users: Users[] = [];
editedUser: Users[] = [];
addNewUser: addUser[] = [];

constructor(private modalService: NgbModal, private usersService: UsersService) {}

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
  this.usersService.getUsers().subscribe({
    next: (v) => {
      this.users = v;
      console.log(v)
    },
    error: (e) => {
      console.log("this is the error " + e)
    }
  })
}

deleteUser(userId: number) {
  this.usersService.deleteUser(userId).subscribe({
    next: (v) => {
      console.log("This user has been deleted " + v)
    },
    error: (e) => {
      console.log(e)
    }
  })
}


editUser(userId: number){
  this.usersService.editUser(userId).subscribe()
}

onSubmit(userForm: FormGroup){
  this.addNewUser = userForm.value;
  this.submitUserForm(this.addNewUser);
}

onEditSubmit(editedUser: FormGroup){

}

submitUserForm(addNewUser: addUser[]) {
  this.usersService.addNewUser(addNewUser).subscribe({
    next: (v) => {
      // TODO: Add Notifier Service
      console.log("User added successfully", v);
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

openEditModal(userForm: any){
  this.userForm.setValue({
    firstName: userForm.value.firstName,
    lastName: userForm.value.lastName,
    username: userForm.value.username,
    email: userForm.value.email,
  });
}

closeModal(){
  this.modalService.dismissAll();
}

}
